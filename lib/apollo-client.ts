import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `https://graphql.contentful.com/content/v1/spaces/bi3cvaccr24r`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer qaC0b9QKLL-6ntI-5KFjL90Il0L9NzqfUlBEpfVQ8Cc`,
      },

      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
