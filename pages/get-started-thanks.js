import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ClaimOfferForm from "../components/ClaimOfferForm";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import thanks from "../images/thank-you.jpg";

function encode(data) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
}

export default function GetStartedThanks({ page }) {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => alert(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <>
      <Head>
        <title>Thank You</title>
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
              src={thanks}
              alt="women doing yoga"
            />
            <div className={"heading container"}>
              <span className="h1">Thank You</span>
              <p className="description">
                Thanks for reaching out. We&apos;ll get back to you
                asap!
              </p>
            </div>
          </div>
          <main>
            <div className="container">
              <div className="contactWrap">
                <article>
                  <h1>Thank You</h1>
                  <p>
                    Your form was successfully submitted. Someone from
                    our office will be responding to you shortly. If
                    you don&apos;t hear back from us within the next
                    24 hours, please check your junk mail to ensure we
                    weren&apos;t flagged by the spam filter.
                    <div>
                      <Link href="/">
                        <a>Return to homepage</a>
                      </Link>
                    </div>
                  </p>
                </article>
              </div>
            </div>
          </main>
        </div>
      </Layout>
      <style jsx>{`
        .contactWrap {
          display: grid;
          grid-template-columns: 100%;
          justify-content: center;
          margin: 0 auto;
          max-width: 100%;
        }
        .formWrap {
          margin: 0;
          padding: 6rem 0;
          border-top: 1px solid var(--grey50);
          border-left: none;
        }
        .top {
          /* background: var(--primaryColor); */
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
          .contactWrap {
            grid-template-columns: 1fr 1fr;
          }
          .formWrap {
            margin: 2rem;
            padding: 2rem 0rem 0rem 4rem;
            border-left: 1px solid var(--grey25);
            border-top: none;
          }
        }
      `}</style>
    </>
  );
}
