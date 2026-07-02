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
  date
  excerpt
  featured
  coverImage { url title }
  ${authorProfileFields}
`;

const bodyLinks = `
  links {
    assets {
      block {
        sys { id }
        url
        contentType
        title
        description
        width
        height
      }
    }
    entries {
      block {
        sys { id }
        __typename
        ... on Trip             { location }
        ... on BlogPost         { title slug }
        ... on CommunityStory   { title slug }
        ... on OurWallOfLove    { reviewerName location }
      }
      inline {
        sys { id }
        __typename
        ... on Trip             { location }
        ... on BlogPost         { title slug }
        ... on CommunityStory   { title slug }
        ... on OurWallOfLove    { reviewerName location }
      }
    }
  }
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
        body { json }
      }
    }
  }
`;

export const queryGetBlogPostBySlug = (slug: string) => gql`
  query {
    blogPostCollection(where: { slug: "${slug}" }, limit: 1) {
      items {
        ${blogPostFields}
        body {
          json
          ${bodyLinks}
        }
      }
    }
  }
`;
