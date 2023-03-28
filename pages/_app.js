import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/inter/variable.css";
import "../styles/reset.css";
import "../styles/swiper.custom.css";
import "../styles/variables.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
