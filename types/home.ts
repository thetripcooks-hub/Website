const sampleHomeBgRes = {
  sys: {
    id: "6EqbKUpce4OIIKjWYRgWVO",
  },
  heroBackground: {
    url: "https://images.ctfassets.net/dzgps77b7h1a/63BjzAjkLb11nLkiWpGtoy/f76fc2bbd0de0fcf1e89307797ac799b/new-home_qgh7ja.avif",
    width: 2071,
    height: 1381,
  },
};

export type HomeBgType = typeof sampleHomeBgRes;

export interface HomeBgResponse {
  homeHeroCollection: {
    items: HomeBgType[];
  };
}
