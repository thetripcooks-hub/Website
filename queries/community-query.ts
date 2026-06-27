import { gql } from "@apollo/client";

export const queryGetCommunityStories = gql`
  query CommunityStories($skip: Int!, $limit: Int!) {
    communityStoryCollection(skip: $skip, limit: $limit, order: date_DESC) {
      total
      items {
        sys { id }
        title
        slug
        author
        date
        readTime
        excerpt
        image { url title }
        category
      }
    }
  }
`;

export const queryGetFeaturedCommunityStories = gql`
  query FeaturedCommunityStories {
    communityStoryCollection(where: { featured: true }, limit: 5, order: date_DESC) {
      items {
        sys { id }
        author
        country
        image { url title }
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
        author
        date
        readTime
        excerpt
        image { url title }
        category
      }
    }
  }
`;
