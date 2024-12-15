import { gql } from "@apollo/client";

export const queryGetHomeBg = gql`
  query {
    homeHeroCollection {
      items {
        sys {
          id
        }
        heroBackground {
          url
          width
          height
        }
      }
    }
  }
`;
