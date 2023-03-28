import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import { buildUrl } from "cloudinary-build-url";
import Head from "next/head";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Image from "next/image";

export default function Page({ page }) {
  const urlPixelated = buildUrl(page.featuredImage.node.slug, {
    cloud: {
      cloudName: "stevebarakat",
    },
    transformations: {
      effect: {
        name: "pixelate",
      },
    },
  });

  return (
    <>
      <Head>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.metaDesc} />
      </Head>
      <Layout>
        <div className="page">
          <div className="mastheadWrap">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              placeholder="blur"
              blurDataURL={urlPixelated}
              src={page.featuredImage.node.sourceUrl}
              alt={page.featuredImage.node.altText}
            />
            <div className={"heading container"}>
              <span className="h1">{page.featuredImage.node.title}</span>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: page.featuredImage.node.caption,
                }}
              ></div>
            </div>
          </div>
          <main>
            <div className="container">
              <div className="pageWrap">
                <article>
                  <h1>{page.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
                </article>
                <div className="sidebarWrap">
                  <Sidebar />
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetWordPressPosts {
        pages {
          nodes {
            uri
            slug
          }
        }
      }
    `,
  });
  return {
    paths: await result.data.pages.nodes.map((uri) => {
      return {
        params: uri,
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = await params;
  const result = await client.query({
    query: gql`
      query GetWordPressPagesBySlug($slug: String!) {
        pageBy(uri: $slug) {
          title
          content
          seo {
            title
            metaDesc
          }
          featuredImage {
            node {
              slug
              title
              caption
              sourceUrl
              altText
            }
          }
        }
      }
    `,
    variables: { slug },
  });
  return {
    props: {
      page: result.data.pageBy,
    },
  };
}
