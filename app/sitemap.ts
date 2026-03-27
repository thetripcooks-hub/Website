import { MetadataRoute } from "next";
import { getClient } from "@/lib/apollo-client";
import { queryGetAllTrips } from "@/queries/trips-query";
import { AllTripsResponse } from "@/types/trip";
import { locationToSlug } from "@/lib/utils";

const BASE = "https://tripcooks.tours";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/home`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/trips`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/private-trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await getClient().query<AllTripsResponse>({
      query: queryGetAllTrips,
    });

    const tripRoutes: MetadataRoute.Sitemap = (
      data?.tripCollection?.items ?? []
    ).map((trip) => {
      return {
        url: `${BASE}/trips/${locationToSlug(trip.location)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...tripRoutes];
  } catch {
    return staticRoutes;
  }
}
