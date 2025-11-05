import { gql } from "@apollo/client";

export const queryGetTripcooksExperience = gql`
  query {
    tripcooksExperienceCollection {
      items {
        imagesCollection {
          items {
            sys {
              id
            }
            url
            title
          }
        }
      }
    }
  }
`;
