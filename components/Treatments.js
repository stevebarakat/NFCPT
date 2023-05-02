import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import styles from "./treatments.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const DISORDERS = gql`
  query GetDisorders {
    nfcptSettings {
      nfcptSettings {
        disorders {
          disorder {
            disorderName
            disorderImageBase64
            disorderLink
            disorderImage {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

const Treatments = () => {
  const { loading, error, data } = useQuery(DISORDERS);
  if (loading) return <div className="loader"></div>;

  if (error) return <p>Error: {error.message} </p>;
  const disorders = data.nfcptSettings.nfcptSettings.disorders;

  return (
    <div className={styles.treatmentsWrap}>
      <div className="container">
        <h2 className={styles.h2}>Injuries & Conditions We Treat</h2>
        <Swiper
          speed={750}
          spaceBetween={0}
          slidesPerView={4}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            570: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            690: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            980: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {disorders.map((disorder, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={styles.card}>
                  <span className={styles.cardHeader}>
                    {disorder.disorder.disorderName}
                  </span>
                  <div
                    style={{
                      position: "relative",
                      width: "12.5rem",
                      height: "12.5rem",
                    }}
                  >
                    <Link href={disorder.disorder.disorderLink} passHref>
                      <Image
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        placeholder="blur"
                        blurDataURL={disorder.disorder.disorderImageBase64}
                        src={disorder.disorder.disorderImage.sourceUrl}
                        alt={disorder.disorder.disorderName}
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Treatments;
