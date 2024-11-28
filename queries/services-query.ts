import { gql } from "@apollo/client";

export const queryGetOurServices = gql`
  query {
    ourServicesCollection {
      items {
        groupTrips {
          url
          title
        }
        privateTrips {
          url
          title
        }
        travelPlanning {
          url
          title
        }
      }
    }
  }
`;
