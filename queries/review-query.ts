import { gql } from "@apollo/client";

export const queryGetReviews = gql`
  query {
    ourWallOfLoveCollection {
      items {
        sys {
          id
        }
        starCount
        date
        location
        socialHandle
        reviewerName
        reviewImage {
          url
          title
        }
        text {
          json
        }
        subText {
          json
        }
      }
    }
  }
`;
