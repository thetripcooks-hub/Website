const sampleAbout = {
  bannerImage: {
    url: "https://images.ctfassets.net/bi3cvaccr24r/2jw9FH4imoxm9ZSabEq8iI/9b8b459cd8a88a13250b5dcc9aaa7456/Rectangle_3.png",
    width: 1222,
    height: 558,
    title: "About us banner image",
  },
  ownersPicture: {
    url: "https://images.ctfassets.net/bi3cvaccr24r/7AJNW55xic6jmPOJOvIbSE/3a619bbd86621faf53e7229bf52f1b90/Rectangle_3.png",
    width: 544,
    height: 558,
    title: "Owners Picture",
  },
};

export type AboutUsPageType = typeof sampleAbout;

export interface AboutUsPageResponse {
  aboutUsPageCollection: {
    items: AboutUsPageType[];
  };
}
