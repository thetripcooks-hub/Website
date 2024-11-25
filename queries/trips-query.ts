import { TripType } from "@/types/trip";
import { gql } from "@apollo/client";

export const queryGetAllTrips = gql`
  query {
    tripCollection {
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
