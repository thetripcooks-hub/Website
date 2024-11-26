import { AppConfig } from "@/lib/config";
import { gql } from "@apollo/client";

// Query all trips
export const queryGetAllTrips = gql`
  query {
    tripCollection {
      total
      items {
        sys {
          id
        }
        location
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
      }
    }
  }
`;

// Query trip by id
export const queryTripById = (id: string) => gql`
  query {
    trip(id: "${id}") {
    sys{
    id
    }
      location
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
    }
  }
`;

// Query trips by location
export const queryTripsByLocation = (location: string) => gql`
  query {
    tripCollection(filter: { location: { eq: "${location}" } }) {
      items {
        sys {
          id
        }
        location
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
      }
    }
  }
`;

// query paginated list of trips
export const queryPaginatedTrips = (page: number) => {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip =
    skipMultiplier > 0 ? AppConfig.pagination.pageSize * skipMultiplier : 0;
  return gql`
  query {
    tripCollection(limit: ${9}, skip: ${skip}) {
      total
      items {
        sys {
          id
        }
        location
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
      }
    }
  }
`;
};
