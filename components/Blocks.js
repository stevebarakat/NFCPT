import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import ray from "../images/ray.webp";
import trio from "../images/trio.webp";
import styles from "./blocks.module.css";

const Blocks = () => {
  return (
    <>
      <div className={styles.wrapper}>
        {/* BLOCK 1 */}
        <div className={styles.block1}>
          <div className={styles.brightness}>
            <Image
              // unoptimized={true}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              src={ray}
              alt="Alex Ray"
            />
          </div>
          <figure>
            <blockquote className={styles.blockquote}>
              <p>
                Keeping my body aligned and free of pain with regular
                chiropractic care is essential.
              </p>
            </blockquote>
            <figcaption>—Alex Ray, professional diver</figcaption>
          </figure>
        </div>

        {/* BLOCK 2 */}
        <div className={styles.contain}>
          <div className={styles.block2}>
            <figure className={styles.figure}>
              <blockquote className={styles.blockquote}>
                <p>
                  Keeping my body aligned and free of pain with regular
                  chiropractic care is essential.
                </p>
              </blockquote>
              <figcaption>—Alex Ray, professional diver</figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* BLOCK 3 */}
      <div
        style={{ background: "var(--accentGradient)", color: "white" }}
        className={styles.wrapper}
      >
        <div className={styles.contain} style={{ justifySelf: "flex-end" }}>
          <div className={styles.block3}>
            <div className={styles.figure}>
              <div className={styles.headline}>
                <p>Join The Club!</p>
              </div>
              <p className={styles.description}>
                The best way to keep your spine healthy is by taking care of it.
                We offer package deals on regular chiropractic treatments and
                massage therapy to club members.
              </p>
              <Link passHref href="/pricing-plans">
                <a>
                  <Button
                    color="var(--accentColor)"
                    borderColor="var(--grey05)"
                    textColor="white"
                  >
                    Pricing Plans
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* BLOCK 4 */}
        <div className={styles.block4}>
          <div className="brightness">
            <Image
              // unoptimized={true}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              src={trio}
              alt="Trio"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blocks;
