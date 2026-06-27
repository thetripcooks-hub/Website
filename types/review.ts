const sampleReview = {
  sys: {
    id: "5mfHulT3rttu919IIJ11NF",
  },
  text: {
    json: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "The most memorable moment on the trip was my rafting experience, just being with everyone while the waves hit was so amazing. ",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  subText: {
    json: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "The most memorable moment on the trip was my rafting experience, just being with everyone while the waves hit was so amazing. ",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
  starCount: 5,
  date: "2024-03-28T00:00:00.000+01:00",
  location: "Turkey 2024",
  socialHandle: null as string | null,
  reviewerName: null as string | null,
  reviewImage: {
    title: "",
    url: "https://images.ctfassets.net/bi3cvaccr24r/3oBxLs20Qj5Br7yK27A4T0/0135dc133fcc77cc157f7d5d95b7854b/review-1.png",
  },
};

export type ReviewType = typeof sampleReview;

export interface AllReviewsResponse {
  ourWallOfLoveCollection: {
    items: ReviewType[];
  };
}
