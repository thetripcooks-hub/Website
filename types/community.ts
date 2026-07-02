import type { Document } from "@contentful/rich-text-types";
import type { AuthorProfile } from "@/types/author";
import type { RichBodyLinks } from "@/types/rich-body";

export type CommunityStory = {
  sys: { id: string };
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: { url: string; title: string } | null;
  category: string | null;
  country: string | null;
  featured: boolean | null;
  body?: { json: Document; links?: RichBodyLinks } | null;
  authorProfile: AuthorProfile | null;
};

export interface CommunityStoriesResponse {
  communityStoryCollection: {
    total: number;
    items: CommunityStory[];
  };
}
