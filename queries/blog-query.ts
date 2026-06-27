import { gql } from "@apollo/client";

const blogPostFields = `
  sys { id }
  title
  slug
  category
  author
  date
  excerpt
  coverImage { url title }
`;

export const queryGetAllBlogPosts = gql`
  query {
    blogPostCollection(order: date_DESC) {
      total
      items {
        ${blogPostFields}
      }
    }
  }
`;

export const queryGetLatestBlogPosts = (limit: number) => gql`
  query {
    blogPostCollection(limit: ${limit}, order: date_DESC) {
      items {
        ${blogPostFields}
      }
    }
  }
`;

export const queryGetBlogPostBySlug = (slug: string) => gql`
  query {
    blogPostCollection(where: { slug: "${slug}" }, limit: 1) {
      items {
        ${blogPostFields}
        body { json }
      }
    }
  }
`;
