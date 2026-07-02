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

export const queryGetCommunityStories = gql`
  query CommunityStories($skip: Int!, $limit: Int!) {
    communityStoryCollection(skip: $skip, limit: $limit, order: date_DESC) {
      total
      items {
        sys { id }
        title
        slug
        date
        excerpt
        image { url title }
        category
        ${authorProfileFields}
      }
    }
  }
`;

export const queryGetFeaturedCommunityStories = gql`
  query FeaturedCommunityStories {
    communityStoryCollection(where: { featured: true }, limit: 5, order: date_DESC) {
      items {
        sys { id }
        country
        image { url title }
        authorProfile { name }
      }
    }
  }
`;

export const queryGetCommunityStoryBySlug = gql`
  query CommunityStoryBySlug($slug: String!) {
    communityStoryCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        title
        slug
        date
        excerpt
        image { url title }
        category
        body {
          json
          ${bodyLinks}
        }
        ${authorProfileFields}
      }
    }
  }
`;
