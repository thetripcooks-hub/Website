/**
 * Links all existing blog posts and community stories to the Trip Cooks author profile.
 *
 * Usage:
 *   node --env-file=.env scripts/link-tripcooks-author.mjs
 */

import { createClient } from "contentful-management";

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master";

if (!MANAGEMENT_TOKEN) {
  console.error("[error] CONTENTFUL_MANAGEMENT_TOKEN is not set in .env.");
  process.exit(1);
}
if (!SPACE_ID) {
  console.error("[error] NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not set in .env.");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });
const envParams = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID };

async function findTripCooksProfile() {
  const results = await client.entry.getMany({
    ...envParams,
    query: { content_type: "authorProfile", "fields.name": "Trip Cooks", limit: 1 },
  });
  if (results.total === 0) {
    throw new Error(
      'Trip Cooks author profile not found. Run "node --env-file=.env scripts/setup-contentful.mjs" first.'
    );
  }
  return results.items[0];
}

async function linkAuthorProfile(contentTypeId, profileEntry) {
  const authorLink = {
    sys: { type: "Link", linkType: "Entry", id: profileEntry.sys.id },
  };

  let skip = 0;
  const limit = 100;
  let updated = 0;
  let skipped = 0;

  while (true) {
    const page = await client.entry.getMany({
      ...envParams,
      query: { content_type: contentTypeId, limit, skip },
    });

    if (page.items.length === 0) break;

    for (const entry of page.items) {
      const alreadyLinked =
        entry.fields.authorProfile?.["en-US"]?.sys?.id === profileEntry.sys.id;

      if (alreadyLinked) {
        console.log(
          `  [skip] ${contentTypeId} "${entry.fields.title?.["en-US"] ?? entry.sys.id}" already linked`
        );
        skipped++;
        continue;
      }

      entry.fields.authorProfile = { "en-US": authorLink };

      const saved = await client.entry.update(
        { ...envParams, entryId: entry.sys.id },
        entry
      );
      await client.entry.publish(
        { ...envParams, entryId: saved.sys.id },
        saved
      );

      console.log(
        `  [ok]   ${contentTypeId} "${entry.fields.title?.["en-US"] ?? entry.sys.id}" linked and published`
      );
      updated++;
    }

    skip += page.items.length;
    if (skip >= page.total) break;
  }

  return { updated, skipped };
}

async function run() {
  console.log("\nLinking Trip Cooks author profile to all posts...\n");

  const profile = await findTripCooksProfile();
  console.log(`Found Trip Cooks profile: ${profile.sys.id}\n`);

  console.log("Blog posts:");
  const blog = await linkAuthorProfile("blogPost", profile);

  console.log("\nCommunity stories:");
  const community = await linkAuthorProfile("communityStory", profile);

  console.log(
    `\nDone. Updated ${blog.updated + community.updated} entries, skipped ${blog.skipped + community.skipped} already linked.\n`
  );
}

run().catch((err) => {
  console.error("\n[error]", err.message ?? err);
  process.exit(1);
});
