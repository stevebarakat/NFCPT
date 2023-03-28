import styles from "./sidebar.module.css";
import { buildUrl } from "cloudinary-build-url";
import Image from "next/image";
import coupon from "../images/new-patient-vertical.svg";
import ClaimOfferForm from "./claim-offer-form";
import { gql, useQuery } from "@apollo/client";

const TESTIMONIALS = gql`
  query GetTestimonials {
    nfcptSettings {
      nfcptSettings {
        testimonials {
          testimonial {
            testimonialAuthor
            testimonialContent
            testimonialPhoto {
              altText
              sourceUrl
              slug
            }
          }
        }
      }
    }
  }
`;

const Sidebar = () => {
  const { loading, error, data } = useQuery(TESTIMONIALS);

  function randomNumber(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const n = randomNumber(0, 1);

  const testimonialPhotoAltText =
    data?.nfcptSettings.nfcptSettings.testimonials[n].testimonial
      .testimonialPhoto.altText;
  const testimonialPhotoUrl =
    data?.nfcptSettings.nfcptSettings.testimonials[n].testimonial
      .testimonialPhoto.sourceUrl;
  const testimonialPhotoSlug =
    data?.nfcptSettings.nfcptSettings.testimonials[n].testimonial
      .testimonialPhoto.slug;
  const testimonialContent =
    data?.nfcptSettings.nfcptSettings.testimonials[n].testimonial
      .testimonialContent;
  const testimonialAuthor =
    data?.nfcptSettings.nfcptSettings.testimonials[n].testimonial
      .testimonialAuthor;

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

  const urlPixelated = buildUrl(testimonialPhotoSlug, {
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
    <aside className={styles.sidebar}>
      <div
        className={styles.sidebarWidget}
        style={{ background: "var(--accentGradient)" }}
      >
        <Image quality={100} src={coupon} alt="New Patient Special" />
        <ClaimOfferForm />
      </div>
      <div
        className={styles.sidebarWidget}
        style={{ background: "var(--primaryGradient)" }}
      >
        <div className={styles.testimonialImg}>
          {testimonialPhotoUrl && (
            <Image
              src={testimonialPhotoUrl}
              placeholder="blur"
              blurDataURL={urlPixelated}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              alt={testimonialPhotoAltText}
            />
          )}
        </div>
        <div>
          <blockquote>
            <span className={styles.testimonial}>{testimonialContent}</span>
          </blockquote>
          <figcaption
            style={{
              color: "var(--grey10)",
              textAlign: "center",
              paddingBottom: "3rem",
            }}
          >
            —{testimonialAuthor}
          </figcaption>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
