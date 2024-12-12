import React from "react";
import { ContactUsProps, useContactUs } from "./useContactUs";
import "./ContactUs.css";
import { NavItemsEnum } from "../../utils/navItems";
import {
  IoCallOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { messageTo } from "../../utils/utilsFc";

const ContactUs: React.FC<ContactUsProps> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const { contactUs } = useContactUs(props);
  // console.log("Data from ContactUs:", data);

  return (
    <>
      <section
        className="section contact"
        id={NavItemsEnum.Contact}
        aria-label="contact"
      >
        <div className="container">
          <div>
            <p className="section-subtitle">Contact</p>

            <h2 className="h2 section-title">Contactez-nous</h2>
          </div>
          <div></div>
        </div>
        <div className="container">
          <div className="contact-content">
            <ul className="contact-list">
              {/* location */}

              <li
                className={`contact-item ${contactUs.location ? "" : "hidden"}`}
              >
                <IoLocationOutline className="react-icon" />
                <address className="contact-link toUppercase">
                  {contactUs.location}
                </address>
              </li>

              {/* phone */}

              <li
                className={`contact-item ${
                  contactUs.telephone ? "" : "hidden"
                }`}
              >
                <IoCallOutline className="react-icon" />

                <a
                  href={`tel:${contactUs.telephone}`}
                  className="contact-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactUs.telephone}
                </a>
              </li>

              {/* url or github  */}

              <li
                className={`contact-item ${contactUs.website ? "" : "hidden"} `}
              >
                <IoGlobeOutline className="react-icon" />

                <a
                  href={contactUs.website}
                  target="_blank"
                  className="contact-link disableToUppercase"
                  rel="noreferrer"
                >
                  {contactUs.website.replace(/^https?:\/\//, "")}
                </a>
              </li>
              <br />
            </ul>
          </div>

          <div className="contact-content">
            <ul className="contact-list">
              {/* <li className="contact-item">
                <p className="section-text">
                  <span className="font-bold text-black-2 inline-flex">
                    {" "}
                    <b> N'hésitez pas à nous contacter </b>
                  </span>
                </p>
              </li> */}
              <li className="contact-item">
                <p className="section-text">
                  <span className="font-bold text-black-2 inline-flex">
                    {" "}
                    <b> Disponibilité : </b>
                  </span>
                  {contactUs.availability}
                </p>
              </li>

              {/* email */}

              <li className={`contact-item ${contactUs.email ? "" : "hidden"}`}>
                <IoMailOutline className="react-icon" />

                <a
                  href={messageTo(contactUs.email)}
                  target="_blank"
                  className="contact-link disableToUppercase"
                  rel="noreferrer"
                >
                  {contactUs.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
