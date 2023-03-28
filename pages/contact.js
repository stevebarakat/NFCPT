import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import ContactForm from "../components/contact-form";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import plans from "../images/plans.jpg";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact({ page }) {
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
        <title>Contact</title>
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
              <span className="h1">Happy Therapy Club</span>
              <p className="description">
                Regular chiropractic adjustments lead to overall health and
                happiness.
              </p>
            </div>
          </div>
          <main>
            <div className="container">
              <div className="contactWrap">
                <article>
                  <h1>Contact</h1>
                  <p>
                    Our goal is to guide you to recovery and beyond. If you have
                    a specific health concern, please contact us for assistance.
                  </p>
                  <p>
                    {" "}
                    We are always looking for feedback to help improve our
                    website and services. Use this form to send us your comments
                    and questions.
                  </p>
                </article>
                <div className="formWrap">
                  <ContactForm />
                </div>
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
