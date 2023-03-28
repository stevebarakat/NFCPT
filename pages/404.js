/* eslint-disable react/no-unknown-property */
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import plans from "../images/plans.jpg";

export default function PageMissing({ page }) {
  return (
    <>
      <Head>
        <title>404 | Page Not Found</title>
        <meta
          name="description"
          content="Car Accident Chiropractor - We focus on auto accident recovery. Get the settlement you deserve. Free consultation (904) 272-4329"
        />
      </Head>
      <Layout>
        <div className="page">
          <div className="mastheadWrap">
            <Image
              priority
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              src={plans}
              alt="women exercising"
            />
            <div className={"heading container"}>
              <span className="h1">Page Not Found</span>
              <p className="description">Whoops... That page does not exist.</p>
            </div>
          </div>
          <main>
            <div className="container">
              <div className="pageWrap">
                <article>
                  <h1>Hummmm... I think we are lost.</h1>
                  <p>
                    Go back{" "}
                    <Link href="/">
                      <a>home</a>
                    </Link>
                    ?
                  </p>
                </article>
                <Sidebar />
              </div>
            </div>
          </main>
        </div>
      </Layout>
      <style jsx>{`
        .planWrap {
          margin: 2rem 00;
          border: 1px solid var(--grey50);
        }
        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, fit-content(50%));
          grid-gap: 1rem;
          text-align: center;
          padding: 2rem;
          font-size: 1rem;
          font-weight: 600;
          background: hsla(201, 100%, 45%, 0.25);
          justify-content: space-between;
          border-bottom: 1px solid var(--grey50);
        }
        .grid3 div {
          /* border: 1px solid black; */
        }
        .top {
          background: var(--primaryColor);
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid var(--grey50);
        }
        .top h3 {
          margin: 0;
          color: var(--grey05);
          width: fit-content;
        }
        @media (min-width: 850px) {
          .grid3 {
            font-size: 2rem;
            grid-gap: 3rem;
            padding: 3rem 2rem;
          }
          .planWrap {
            margin: 2rem;
          }
        }
      `}</style>
    </>
  );
}
