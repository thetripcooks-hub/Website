import type { Document } from "@contentful/rich-text-types";
import type { AuthorProfile } from "@/types/author";

export type CommunityStory = {
  sys: { id: string };
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  image: { url: string; title: string } | null;
  category: string | null;
  country: string | null;
  featured: boolean | null;
  body?: { json: Document } | null;
  authorProfile?: AuthorProfile | null;
};

export interface CommunityStoriesResponse {
  communityStoryCollection: {
    total: number;
    items: CommunityStory[];
  };
}
