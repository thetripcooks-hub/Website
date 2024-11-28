import { AppConfig } from "@/lib/config";
import { gql } from "@apollo/client";

const tripQuery = `{
        sys {
          id
        }
        location
        soldOut
        travelWithOwners
        isFeaturedTrip
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
        discount
        whatsIncluded
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

// query paginated list of trips
export const queryPaginatedTrips = (page: number, sortkey?: string | null) => {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip =
    skipMultiplier > 0 ? AppConfig.pagination.pageSize * skipMultiplier : 0;
  return gql`
  query {
    tripCollection(${
      sortkey ? `order:${sortkey}, ` : ""
    }limit: ${9}, skip: ${skip}) {
      total
      items ${tripQuery}
    }
  }
`;
};
