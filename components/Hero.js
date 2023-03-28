import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";
import styles from "./hero.module.css";

const Hero = ({ home }) => {
  const urlPixelated = buildUrl(home.featuredImage.node.slug, {
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
        blurDataURL={urlPixelated}
        src={home.featuredImage.node.sourceUrl}
        alt={home.featuredImage.node.altText}
      />
    </section>
  );
};

export default Hero;
