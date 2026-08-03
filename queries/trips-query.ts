import { gql } from "@apollo/client";

const tripQuery = `{
        sys {
          id
        }
        location
        soldOut
        travelWithOwners
        isFeaturedTrip
        tags
        bannerImagesCollection {
          items {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
        startDate
        endDate
        description
        fullAmount
        currency
        discount
        whatsIncluded
        whatsNotIncluded
        groupSize
        slots
        downPayment
        installments
        itinerary
        viewsOfLocationCollection {
          items {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
      }`;

// Query all trips
// order: startDate_ASC, where: {startDate_gt:"${new Date().toISOString()}"}
export const queryGetAllTrips = gql`
  query {
     tripCollection {
      total
      items ${tripQuery}
    }
  }
`;

// Query trip by id
export const queryTripById = (id: string) => gql`
  query {
    trip(id: "${id}") ${tripQuery}
  }
`;

// Query trips by location
export const queryTripsByLocation = (location: string) => gql`
  query {
    tripCollection(filter: { location: { eq: "${location}" } }) {
      items ${tripQuery}
    }
  }
`;

