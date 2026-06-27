export type CommunityStory = {
  sys: { id: string };
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string | null;
  excerpt: string;
  image: { url: string; title: string } | null;
  category: string | null;
  country: string | null;
  featured: boolean | null;
};

export interface CommunityStoriesResponse {
  communityStoryCollection: {
    total: number;
    items: CommunityStory[];
  };
}
