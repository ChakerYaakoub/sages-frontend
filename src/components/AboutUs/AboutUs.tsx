import React from "react";
import { AboutUsProps, useAboutUs } from "./useAboutUs";
import "./AboutUs.css";
import { NavItemsEnum } from "../../utils/navItems";

const AboutUs: React.FC<AboutUsProps> = (props) => {
  const { about, about2 } = useAboutUs(props);

  return (
    <>
      <section className="section " id={NavItemsEnum.Propos} aria-label="about">
        <div className="container">
          <p className="section-subtitle">À propos</p>

          <h2 className="h2 section-title">Objectif de ce site web</h2>

          <div className="about-us" id="about-us">
            {/* <p> */}
            {about.trim().length > 0 ? (
              <div
                className="descriptionText hiddenInMobileAboutUs "
                dangerouslySetInnerHTML={{ __html: about }}
              />
            ) : (
              "About us details will be added soon."
            )}
          </div>
          <div
            className="descriptionText hiddenInPcAboutUs"
            dangerouslySetInnerHTML={{ __html: about2 }}
          />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
