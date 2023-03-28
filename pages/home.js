import Head from "next/head";
import Image from "next/image";
import styles from "../components/hero.module.css";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import hero from "../images/hero.webp";
const Cta = loadable(() => import("../components/Cta"));
const Mission = loadable(() => import("../components/Mission"));
const Treatments = loadable(() => import("../components/Treatments"));
const Blocks = loadable(() => import("../components/Blocks"));

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetHomepage {
        pageBy(uri: "homepage") {
          title
          featuredImage {
            node {
              slug
              title
              caption
              sourceUrl
              altText
            }
          }
          seo {
            metaDesc
            title
          }
        }
      }
    `,
  });
  return {
    props: {
      home: await result.data.pageBy,
    },
  };
}

const Hero = ({ home }) => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero}>
        <span className={styles.headline}>{home.featuredImage.node.title}</span>
        <div
          dangerouslySetInnerHTML={{
            __html: home.featuredImage.node.caption,
          }}
          className={styles.description}
        ></div>
      </div>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
        src={hero}
        alt="Car Accident Victem"
      />
    </section>
  );
};

export default function Home({ home }) {
  return (
    <>
      <Head>
        <title>{home.seo.title}</title>
        <meta name="description" content={home.seo.metaDesc} />
      </Head>
      <Layout>
        <Hero home={home} />
        <Cta />
        <Mission />
        <Treatments />
        <Blocks />
      </Layout>
    </>
  );
}
