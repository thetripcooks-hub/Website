/**
 * Idempotent Contentful content type setup script.
 *
 * Adds missing fields, removes deprecated fields, and seeds initial entries.
 * Safe to re-run — already-present fields and content types are skipped.
 *
 * Usage:
 *   node --env-file=.env scripts/setup-contentful.mjs
 *
 * Required env var:
 *   CONTENTFUL_MANAGEMENT_TOKEN  — Personal Access Token from Contentful:
 *     Settings → API keys → Personal access tokens → Generate personal token
 */

import { createClient } from "contentful-management";

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master";

if (!MANAGEMENT_TOKEN) {
  console.error(
    "\n[error] CONTENTFUL_MANAGEMENT_TOKEN is not set in .env.\n" +
      "  1. Go to Contentful → Settings → API keys → Personal access tokens\n" +
      '  2. Click "Generate personal token", give it a name, copy the token\n' +
      "  3. Add to .env:  CONTENTFUL_MANAGEMENT_TOKEN=your-token-here\n",
  );
  process.exit(1);
}

if (!SPACE_ID) {
  console.error("[error] NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not set in .env.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Content type definitions
// authorProfile must come before blogPost and communityStory so it exists
// before those types try to reference it.
// ---------------------------------------------------------------------------

const CHANGES = [
  {
    contentTypeId: "authorProfile",
    displayName: "Author Profile",
    fields: [
      { id: "name",            name: "Name",             type: "Symbol", required: true },
      { id: "instagramHandle", name: "Instagram Handle", type: "Symbol", required: false },
      { id: "tiktokHandle",    name: "TikTok Handle",    type: "Symbol", required: false },
      { id: "whatsappNumber",  name: "WhatsApp Number",  type: "Symbol", required: false },
      { id: "linkedinHandle",  name: "LinkedIn Handle",  type: "Symbol", required: false },
    ],
  },
  {
    contentTypeId: "trip",
    fields: [
      { id: "whatsNotIncluded", name: "What's Not Included", type: "Object",  required: false },
      { id: "groupSize",        name: "Group Size",          type: "Symbol",  required: false },
    ],
  },
  {
    contentTypeId: "ourWallOfLove",
    fields: [
      { id: "socialHandle",  name: "Social Handle",  type: "Symbol", required: false },
      { id: "reviewerName",  name: "Reviewer Name",  type: "Symbol", required: false },
    ],
  },
  {
    contentTypeId: "blogPost",
    slugField: "slug",
    fields: [
      { id: "title",         name: "Title",          type: "Symbol",   required: true },
      { id: "slug",          name: "Slug",           type: "Symbol",   required: true, unique: true },
      { id: "category",      name: "Category",       type: "Symbol",   required: true },
      { id: "author",        name: "Author",         type: "Symbol",   required: true },
      { id: "date",          name: "Date",           type: "Date",     required: true },
      { id: "excerpt",       name: "Excerpt",        type: "Text",     required: true },
      { id: "coverImage",    name: "Cover Image",    type: "Link",     linkType: "Asset",  required: false },
      { id: "body",          name: "Body",           type: "RichText", required: false },
      { id: "featured",      name: "Featured",       type: "Boolean",  required: false },
      {
        id: "authorProfile",
        name: "Author Profile",
        type: "Link",
        linkType: "Entry",
        linkContentType: ["authorProfile"],
        required: false,
      },
    ],
  },
  {
    contentTypeId: "communityStory",
    slugField: "slug",
    removeFields: ["readTime"],
    fields: [
      { id: "title",         name: "Title",          type: "Symbol",   required: true },
      { id: "slug",          name: "Slug",           type: "Symbol",   required: true, unique: true },
      { id: "author",        name: "Author",         type: "Symbol",   required: true },
      { id: "date",          name: "Date",           type: "Date",     required: true },
      { id: "excerpt",       name: "Excerpt",        type: "Text",     required: true },
      { id: "image",         name: "Image",          type: "Link",     linkType: "Asset",  required: false },
      { id: "category",      name: "Category",       type: "Symbol",   required: false },
      { id: "country",       name: "Country",        type: "Symbol",   required: false },
      { id: "featured",      name: "Featured",       type: "Boolean",  required: false },
      { id: "body",          name: "Body",           type: "RichText", required: false },
      {
        id: "authorProfile",
        name: "Author Profile",
        type: "Link",
        linkType: "Entry",
        linkContentType: ["authorProfile"],
        required: false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildFieldDef(f) {
  const def = {
    id: f.id,
    name: f.name,
    type: f.type,
    required: f.required ?? false,
    localized: false,
  };
  if (f.linkType) def.linkType = f.linkType;

  const validations = [];
  if (f.unique) validations.push({ unique: true });
  if (f.linkContentType) validations.push({ linkContentType: f.linkContentType });
  if (validations.length > 0) def.validations = validations;

  return def;
}

async function applySlugAppearance(client, params, slugFieldId) {
  try {
    const ei = await client.editorInterface.get(params);
    const alreadySet = ei.controls?.some(
      (c) => c.fieldId === slugFieldId && c.widgetId === "slugEditor",
    );
    if (alreadySet) {
      console.log(`  slug appearance already set — skipping`);
      return;
    }
    ei.controls = (ei.controls ?? []).map((c) =>
      c.fieldId === slugFieldId
        ? { ...c, widgetId: "slugEditor", widgetNamespace: "builtin", settings: { trackingFieldId: "title" } }
        : c,
    );
    await client.editorInterface.update(params, ei);
    console.log(`  slug appearance set to auto-generate from title ✓`);
  } catch (err) {
    console.warn(`  could not update editor interface: ${err.message}`);
  }
}

async function applyChanges(client, { contentTypeId, displayName, fields, slugField, removeFields = [] }) {
  console.log(`\n→ Content type: ${contentTypeId}`);
  const params = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID, contentTypeId };

  let ct;
  try {
    ct = await client.contentType.get(params);
    console.log(`  found — checking fields`);
  } catch (err) {
    if (err.name === "NotFound") {
      console.log(`  not found — creating`);
      ct = await client.contentType.createWithId(params, {
        name: displayName ?? contentTypeId,
        fields: fields.map(buildFieldDef),
      });
      ct = await client.contentType.publish({ ...params, version: ct.sys.version }, ct);
      console.log(`  created and published ✓`);
      if (slugField) await applySlugAppearance(client, params, slugField);
      return;
    }
    throw err;
  }

  const existingIds = new Set(ct.fields.map((f) => f.id));
  const toAdd = fields.filter((f) => !existingIds.has(f.id));

  // Fields that already exist but are missing the unique validation
  const toUpdateUnique = fields.filter((f) => {
    if (!existingIds.has(f.id) || !f.unique) return false;
    const existing = ct.fields.find((ef) => ef.id === f.id);
    return !existing?.validations?.some((v) => v.unique === true);
  });

  // Fields to remove (omit first, then delete)
  const toRemove = removeFields.filter((id) => existingIds.has(id));

  const hasChanges = toAdd.length > 0 || toUpdateUnique.length > 0 || toRemove.length > 0;

  if (!hasChanges) {
    console.log(`  all fields already present and up to date — skipping`);
  } else {
    for (const f of toAdd) console.log(`  + ${f.id} (${f.type})`);
    for (const f of toUpdateUnique) console.log(`  ~ ${f.id} — adding unique validation`);
    for (const id of toRemove) console.log(`  - ${id} — removing deprecated field`);

    // Step 1: merge existing fields (add new, patch unique)
    let mergedFields = ct.fields.map((ef) => {
      const needsUnique = toUpdateUnique.find((f) => f.id === ef.id);
      if (needsUnique) return { ...ef, validations: [...(ef.validations ?? []), { unique: true }] };
      // Omit fields scheduled for removal
      if (toRemove.includes(ef.id)) return { ...ef, omitted: true };
      return ef;
    });

    ct = await client.contentType.update(params, {
      ...ct,
      fields: [...mergedFields, ...toAdd.map(buildFieldDef)],
    });
    ct = await client.contentType.publish({ ...params, version: ct.sys.version }, ct);

    // Step 2: if fields were omitted, now delete them
    if (toRemove.length > 0) {
      ct = await client.contentType.get(params);
      ct = await client.contentType.update(params, {
        ...ct,
        fields: ct.fields.filter((ef) => !toRemove.includes(ef.id)),
      });
      ct = await client.contentType.publish({ ...params, version: ct.sys.version }, ct);
      console.log(`  removed deprecated fields ✓`);
    }

    console.log(`  updated and published ✓`);
  }

  if (slugField) await applySlugAppearance(client, params, slugField);
}

// ---------------------------------------------------------------------------
// Seed: Trip Cooks author profile entry
// ---------------------------------------------------------------------------

async function seedTripCooksAuthorProfile(client) {
  console.log(`\n→ Seeding Trip Cooks author profile entry…`);
  const envParams = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID };

  // Search for an existing entry with name = "Trip Cooks"
  const existing = await client.entry.getMany({
    ...envParams,
    query: { content_type: "authorProfile", "fields.name": "Trip Cooks", limit: 1 },
  });

  if (existing.total > 0) {
    console.log(`  Trip Cooks author profile already exists — skipping`);
    return;
  }

  const entry = await client.entry.create(
    { ...envParams, contentTypeId: "authorProfile" },
    {
      fields: {
        name:            { "en-US": "Trip Cooks" },
        instagramHandle: { "en-US": "tripcooks" },
        tiktokHandle:    { "en-US": "tripcooks" },
        whatsappNumber:  { "en-US": "447310016389" },
        linkedinHandle:  { "en-US": "company/tripcooks" },
      },
    },
  );

  await client.entry.publish({ ...envParams, entryId: entry.sys.id }, entry);
  console.log(`  Trip Cooks author profile created and published ✓`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

console.log(`\nConnecting to space ${SPACE_ID} / environment ${ENVIRONMENT_ID}…`);
await client.space.get({ spaceId: SPACE_ID });
console.log("Connected.\n");

for (const change of CHANGES) {
  await applyChanges(client, change);
}

await seedTripCooksAuthorProfile(client);

console.log("\nDone. All content types are up to date.\n");
