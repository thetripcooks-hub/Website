const sampleTripExperience = {
  sys: {
    id: "tcCKjlm9mFeA3yxKcqKnI",
  },
  imagesCollection: {
    items: [
      {
        sys: {
          id: "0EkWEhGydl787easY9aZl",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/0EkWEhGydl787easY9aZl/d070d4e0f42388e141319fa37d48a370/trip-experience-2.png",
        title: "trip-experience-2",
      },
      {
        sys: {
          id: "7qQXWtG9gR7XKCkZy54hS2",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/7qQXWtG9gR7XKCkZy54hS2/d7c9909aa466054ef88a0b52c9be2f9a/trip-experience-9.png",
        title: "trip-experience-9",
      },
      {
        sys: {
          id: "7g9Q9IfeozTvkNWoxQiXIy",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/7g9Q9IfeozTvkNWoxQiXIy/6b7c5743347be1946eb1ee13122b22da/trip-experience-1.png",
        title: "trip-experience-1",
      },
      {
        sys: {
          id: "6SZTOKK86FxA9xjbCo1qAZ",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/6SZTOKK86FxA9xjbCo1qAZ/b75638cf3888443052b3dd6069bbb7a2/trip-experience-10.png",
        title: "trip-experience-10",
      },
      {
        sys: {
          id: "393ebUVCxSgvG6BVNsXmbS",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/393ebUVCxSgvG6BVNsXmbS/116f1921df235418905f608e06d06d4a/trip-experience-5.png",
        title: "trip-experience-5",
      },
      {
        sys: {
          id: "3F2s7bx5jJyf0bqNtTIe6",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/3F2s7bx5jJyf0bqNtTIe6/30eb90a66bdfc5f3c65167ca1e2c51cf/trip-experience-12.png",
        title: "trip-experience-12",
      },
      {
        sys: {
          id: "61ATuf9h3oFj24AKzNSpjj",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/61ATuf9h3oFj24AKzNSpjj/c46dc467857a70de88414b1914c6fbc8/trip-experience-7.png",
        title: "trip-experience-7",
      },
      {
        sys: {
          id: "18cBWR499QkZu9WX2tCKux",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/18cBWR499QkZu9WX2tCKux/bab7adf988ee8fbc523f4e1da9edfc16/trip-experience-11.png",
        title: "trip-experience-11",
      },
      {
        sys: {
          id: "4j6D5FlvsXNbjFLpyNjZnK",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/4j6D5FlvsXNbjFLpyNjZnK/b97e972f7b3bed00822322684fabe3de/trip-experience-6.png",
        title: "trip-experience-6",
      },
      {
        sys: {
          id: "5hSBFbJ3X9K2hkM9IXKiNt",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/5hSBFbJ3X9K2hkM9IXKiNt/781a11c32ad34c85f239c3bd3afc9381/trip-experience-4.png",
        title: "trip-experience-4",
      },
      {
        sys: {
          id: "7tOPA9Rosm5kprsy9hT0bJ",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/7tOPA9Rosm5kprsy9hT0bJ/5b593f918a060dd720aa5063f461a719/trip-experience-3.png",
        title: "trip-experience-3",
      },
      {
        sys: {
          id: "4FCJwOKWqCfPzYNZ2Ed1sN",
        },
        url: "https://images.ctfassets.net/bi3cvaccr24r/4FCJwOKWqCfPzYNZ2Ed1sN/1f21825b84c17928cef81b56ca198d17/trip-experience-8.png",
        title: "trip-experience-8",
      },
    ],
  },
};
export type TripExperienceType = typeof sampleTripExperience;

export interface TripExperienceResponse {
  tripcooksExperienceCollection: {
    items: TripExperienceType[];
  };
}
