import styles from "./cta.module.css";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import hundredFive from "../images/hundredFive.svg";
import special from "../images/special.svg";

const Cta = () => {
  return (
    <div className={styles.cta}>
      <div className="grid">
        <div id="left" className={styles.ctaLeftWrap}>
          <div className={styles.hundredFive}>
            <Image
              objectPosition="center"
              src={hundredFive}
              alt="New Patient Special"
            />
          </div>
          <Image
            objectPosition="center"
            src={special}
            alt="New Patient Special"
          />
        </div>
        <div id="right" className={styles.ctaRightWrap}>
          <div>
            <span className={styles.ctaHeader}>Begin The New You</span>
            <span className={styles.ctaSubHeader}>Take the first step</span>
            <div className={styles.ctaForm}>
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
                      <Button color="white" textColor="var(--accentColor)">
                        Our Wellness Plan
                      </Button>
                    </a>
                  </Link>
                  <Link passHref href="/get-started">
                    <a>
                      <Button
                        color="var(--accentColor)"
                        borderColor="var(--grey05)"
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
        </div>
      </div>
    </div>
  );
};

export default Cta;
