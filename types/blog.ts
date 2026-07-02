import type { Document } from "@contentful/rich-text-types";
import type { BlogCategory } from "@/app/blog/_components/blog-data";
import type { AuthorProfile } from "@/types/author";

export type CmsBlogPost = {
  sys: { id: string };
  title: string;
  slug: string;
  category: BlogCategory;
  author: string;
  date: string;
  excerpt: string;
  coverImage: { url: string; title: string } | null;
  body?: { json: Document } | null;
  featured?: boolean | null;
  authorProfile?: AuthorProfile | null;
};

export interface BlogPostsResponse {
  blogPostCollection: {
    total: number;
    items: CmsBlogPost[];
  };
}

export interface BlogPostBySlugResponse {
  blogPostCollection: {
    items: CmsBlogPost[];
  };
}
