import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import styles from "./footer.module.css";
import {
  FaTwitterSquare,
  FaYoutubeSquare,
  FaFacebookSquare,
} from "react-icons/fa";
import { SiGooglemybusiness } from "react-icons/si";
import Button from "./Button";

const FOOTER = gql`
  query getFooterValues {
    menus(where: { slug: "info" }) {
      edges {
        node {
          name
          menuItems {
            nodes {
              label
              url
            }
          }
        }
      }
    }
    nfcptSettings {
      nfcptSettings {
        officeHours {
          day {
            closes
            dayOfWeek
            opens
          }
        }
        socialMedia {
          facebook
          google
          twitter
        }
        contactInfo {
          address
          businessName
          cityStateZip
          fax
          phone
        }
      }
    }
  }
`;

const Footer = () => {
  const { loading, error, data } = useQuery(FOOTER);

  const officeHours = data?.nfcptSettings.nfcptSettings.officeHours;
  const hours = officeHours?.map((item, i) => (
    <li key={i}>
      {item.day.dayOfWeek}: {item.day.opens} - {item.day.closes}
    </li>
  ));

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message} </p>;

  const contactInfo = data.nfcptSettings.nfcptSettings.contactInfo;

  const infoMenu = data.menus.edges[0].node;
  const infoMenuNodes = infoMenu.menuItems.nodes;
  const infoMenuItems = infoMenuNodes.map((item) => (
    <li key={item.url}>
      <a href={item.url}>{item.label}</a>
    </li>
  ));

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.upperFooter}>
          <div>
            <span className={styles.headline}>
              Get The Settlement You Deserve.
            </span>
            <span className={styles.description}>
              We work closely with attorneys to ensure you get the settlement
              you deserve.
            </span>
          </div>
          <div className={styles.btnWrap}>
            <div className="flex">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Link passHref href="/about-us">
                  <a>
                    <Button
                      color="white"
                      textColor="var(--grey75)"
                      borderColor="var(--grey05)"
                    >
                      Our Wellness Plan
                    </Button>
                  </a>
                </Link>
                <Link passHref href="/get-started">
                  <a>
                    <Button
                      color="var(--accentColor)"
                      borderColor="var(--accentColor)"
                      textColor="white"
                    >
                      Get Started
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerFooter}>
          <div>
            <p className={styles.h4}>Office Hours</p>
            <ul>{hours}</ul>
          </div>
          <div>
            <p className={styles.h4}>{infoMenu.name}</p>
            <ul>{infoMenuItems}</ul>
          </div>
          <div>
            <p className={styles.h4}>Connect</p>
            <ul>
              <li>
                <a
                  className={styles.social}
                  href="https://www.google.com/search?q=North+Florida+Chiropractic+Physical+Therapy#lpstate=pid:-1"
                >
                  <span className={styles.icon}>
                    <SiGooglemybusiness />
                  </span>
                  <span>Google</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.social}
                  href="https://www.facebook.com/northfloridachiropracticphysicaltherapy/"
                >
                  <span className={styles.icon}>
                    <FaFacebookSquare />
                  </span>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a className={styles.social} href="#yt">
                  <span className={styles.icon}>
                    <FaYoutubeSquare />
                  </span>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.social}
                  href="https://twitter.com/NFLChiro"
                >
                  <span className={styles.icon}>
                    <FaTwitterSquare />
                  </span>
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.h4}>Contact Info</p>
            <ul>
              <li className="bold">{contactInfo.businessName}</li>
              <li>{contactInfo.address}</li>
              <li>{contactInfo.cityStateZip}</li>
              <li>
                Tel: <a href="tel: 9042724329">{contactInfo.phone}</a>
              </li>
              <li>Fax: {contactInfo.fax}</li>
            </ul>
          </div>
        </div>
        <div className={styles.colophon}>
          <div>&copy;2021 North Florida Chiropractic Physical Therapy</div>
          <div>
            Site by <a href="https://stevebarakat.com">S.Barakat</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
