import { MetadataRoute } from "next";
import { getClient } from "@/lib/apollo-client";
import { queryGetAllTrips } from "@/queries/trips-query";
import { queryGetAllBlogPosts } from "@/queries/blog-query";
import { queryGetCommunityStories } from "@/queries/community-query";
import { AllTripsResponse } from "@/types/trip";
import { BlogPostsResponse } from "@/types/blog";
import { CommunityStoriesResponse } from "@/types/community";
import { generateTripSlug } from "@/lib/utils";

const BASE = "https://tripcooks.tours";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/trips`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/private-trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/how-to-book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE}/community`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
];
// Note: /home deliberately excluded — it 308-redirects to `/`, and a
// redirecting URL shouldn't be listed as a canonical sitemap entry.

async function getTripRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await getClient().query<AllTripsResponse>({
      query: queryGetAllTrips,
    });
    return (data?.tripCollection?.items ?? []).map((trip) => ({
      url: `${BASE}/trips/${generateTripSlug(trip)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await getClient().query<BlogPostsResponse>({
      query: queryGetAllBlogPosts,
    });
    return (data?.blogPostCollection?.items ?? []).map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

async function getCommunityRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await getClient().query<CommunityStoriesResponse>({
      query: queryGetCommunityStories,
      variables: { skip: 0, limit: 100 },
    });
    return (data?.communityStoryCollection?.items ?? []).map((story) => ({
      url: `${BASE}/community/${story.slug}`,
      lastModified: new Date(story.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tripRoutes, blogRoutes, communityRoutes] = await Promise.all([
    getTripRoutes(),
    getBlogRoutes(),
    getCommunityRoutes(),
  ]);

  return [...staticRoutes, ...tripRoutes, ...blogRoutes, ...communityRoutes];
}
