const samplePrivateTrip = {
  viewsOurLastTripsCollection: {
    items: [
      {
        sys: {
          id: "393ebUVCxSgvG6BVNsXmbS",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/393ebUVCxSgvG6BVNsXmbS/116f1921df235418905f608e06d06d4a/trip-experience-5.png",
      },
      {
        sys: {
          id: "3F2s7bx5jJyf0bqNtTIe6",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/3F2s7bx5jJyf0bqNtTIe6/30eb90a66bdfc5f3c65167ca1e2c51cf/trip-experience-12.png",
      },
      {
        sys: {
          id: "61ATuf9h3oFj24AKzNSpjj",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/61ATuf9h3oFj24AKzNSpjj/c46dc467857a70de88414b1914c6fbc8/trip-experience-7.png",
      },
      {
        sys: {
          id: "18cBWR499QkZu9WX2tCKux",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/18cBWR499QkZu9WX2tCKux/bab7adf988ee8fbc523f4e1da9edfc16/trip-experience-11.png",
      },
      {
        sys: {
          id: "4j6D5FlvsXNbjFLpyNjZnK",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/4j6D5FlvsXNbjFLpyNjZnK/b97e972f7b3bed00822322684fabe3de/trip-experience-6.png",
      },
      {
        sys: {
          id: "5hSBFbJ3X9K2hkM9IXKiNt",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/5hSBFbJ3X9K2hkM9IXKiNt/781a11c32ad34c85f239c3bd3afc9381/trip-experience-4.png",
      },
      {
        sys: {
          id: "7tOPA9Rosm5kprsy9hT0bJ",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/7tOPA9Rosm5kprsy9hT0bJ/5b593f918a060dd720aa5063f461a719/trip-experience-3.png",
      },
      {
        sys: {
          id: "4FCJwOKWqCfPzYNZ2Ed1sN",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/4FCJwOKWqCfPzYNZ2Ed1sN/1f21825b84c17928cef81b56ca198d17/trip-experience-8.png",
      },
    ],
  },
};

export type PrivateTripType = typeof samplePrivateTrip;

export interface PrivateTripResponse {
  privateTripPageCollection: {
    items: PrivateTripType[];
  };
}
