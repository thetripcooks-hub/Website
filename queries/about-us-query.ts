import { gql } from "@apollo/client";

export const queryAboutUsPage = gql`
  query {
    aboutUsPageCollection {
      items {
        bannerImage {
          url
          width
          height
          title
        }
        ownersPicture {
          url
          width
          height
          title
        }
      }
    }
  }
`;
