import { gql } from "@apollo/client";

const authorProfileFields = `
  authorProfile {
    sys { id }
    name
    instagramHandle
    tiktokHandle
    whatsappNumber
    linkedinHandle
  }
`;

const blogPostFields = `
  sys { id }
  title
  slug
  category
  author
  date
  excerpt
  featured
  coverImage { url title }
  ${authorProfileFields}
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
