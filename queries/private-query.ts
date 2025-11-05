import { gql } from "@apollo/client";

export const queryGetPrivateTripPage = gql`
  query {
    privateTripPageCollection {
      items {
        viewsOurLastTripsCollection {
          items {
            sys {
              id
            }
            url
          }
        }
      }
    }
  }
`;
