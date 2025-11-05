const sampleService = {
  groupTrips: {
    url: "https://images.ctfassets.net/bi3cvaccr24r/1QhZDSoj0zmFY7EOCrq68a/961599933b1664afe2b0744b143569ad/group-trip.png",
    title: "group trip banner image",
  },
  privateTrips: {
    url: "https://images.ctfassets.net/bi3cvaccr24r/Ew9IZQ4gPsZXWsiDRtOiV/e8b8db179f4b0ece1072b151af196b00/Rectangle_11.png",
    title: "private trip banner image",
  },
  travelPlanning: {
    url: "https://images.ctfassets.net/bi3cvaccr24r/1cBN5J1t4clc3IOGn7DOcA/e5e3b8b9289c63b6e0dc31e150519207/image.png",
    title: "travel planning banner image",
  },
};

export type OurServicesType = typeof sampleService;

export interface OurServicesResponse {
  ourServicesCollection: {
    items: OurServicesType[];
  };
}
