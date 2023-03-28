import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import happy from "../images/happy.jpg";
import styles from "./plans.module.css";

const PRICING_PLANS = gql`
  query GetPricingPlans {
    nfcptSettings {
      nfcptSettings {
        pricingPlans {
          pricingPlan {
            title
            pricingLevel {
              discountAmount
              duration
              newPrice
              numberOfVisits
              oldPrice
            }
          }
        }
      }
    }
  }
`;

export default function Plans() {
  const { loading, error, data } = useQuery(PRICING_PLANS);

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

  const pricingPlans = data.nfcptSettings.nfcptSettings.pricingPlans.map(
    (plan, i) => (
      <div key={i} className={styles.planWrap}>
        <div className={styles.top}>
          <h3>{plan.pricingPlan.title}</h3>
        </div>
        {plan.pricingPlan.pricingLevel.map((level, j) => (
          <div key={j} className={styles.grid3}>
            <div>{level.numberOfVisits} Visits</div>
            <div style={{ fontWeight: "800" }}>
              Save {level.discountAmount}%
            </div>
            <div>
              <span className="strike">${level.newPrice}</span> $
              {level.oldPrice}
            </div>
          </div>
        ))}
      </div>
    )
  );
  return (
    <>
      <Head>
        <title>Pricing Plans</title>
        <meta
          name="description"
          content="Car Accident Chiropractor - We focus on auto accident recovery. Get the settlement you deserve. Free consultation (904) 272-4329"
        />
      </Head>
      <Layout>
        <div className={styles.plans}>
          <Image
            priority
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            quality={100}
            placeholder="blur"
            src={happy}
            alt="happy girl"
          />
          <main>
            <div className="container">
              <div className="pageWrap">
                <article style={{ zIndex: 9 }}>
                  <h1>Pricing Plans</h1>
                  <p>
                    After receiving your initial consultation, Dr. Orlando will
                    perform a full exam in order to gain insight on what
                    recovery plan will work for you. Since the recommendation
                    will vary from person to person, we offer multiple plans
                    that are both affordable and convenient without the hassles
                    of long term contracts.
                  </p>
                  {/* CHIROPRACTIC ADJUSTMENTS */}
                  {pricingPlans}
                </article>
                <Sidebar />
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}
