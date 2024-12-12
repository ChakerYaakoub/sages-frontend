import { FooterProps, useFooter } from "./useFooter";
import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  // FaWhatsapp,
} from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
// import { CiInstagram } from "react-icons/ci";
import { AiFillInstagram } from "react-icons/ai";

const Footer: React.FC<FooterProps> = (props) => {
  const { footer } = useFooter(props);
  if (!footer) return null;

  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">
          Propulsé par{" "}
          <a
            href={footer.copyrightLink}
            className="copyright-link"
            target="_blank"
            rel="noreferrer"
          >
            {"  "}
            {footer.copyrightLinkText}.{" "}
          </a>{" "}
          {footer.copyright}.{" "}
        </p>

        {/* <p> 
          Powered by{" "}
          <a href="https://www.yourcompanywebsite.com">YourCompanyName</a>
        </p> */}

        <ul className="social-list">
          <li className={`${footer.linkedin ? "" : "hidden"}`}>
            <a
              href={footer.linkedin || ""}
              className={`social-link ${footer.linkedin ? "" : "hidden"}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="react-icon" />
            </a>
          </li>
          {/* url or github  */}

          {/* Email  */}

          <li className={`${footer.twitter ? "" : "hidden"}`}>
            <a
              href={footer.twitter}
              className={`social-link ${footer.twitter ? "" : "hidden"}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="react-icon" />
            </a>
          </li>

          <li className={`${footer.youtube ? "" : "hidden"}`}>
            <a
              href={footer.youtube}
              className={`social-link ${footer.youtube ? "" : "hidden"}`}
              target="_blank"
              rel="noreferrer"
            >
              <TfiYoutube className="react-icon" />
            </a>
          </li>
          <li className={`${footer.facebook ? "" : "hidden"}`}>
            <a
              href={footer.facebook}
              className={`social-link ${footer.facebook ? "" : "hidden"}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="react-icon" />
            </a>
          </li>

          <li className={`${footer.instagram ? "" : "hidden"}`}>
            <a
              href={footer.instagram}
              className={`social-link ${footer.instagram ? "" : "hidden"}`}
              target="_blank"
              rel="noreferrer"
            >
              {/* <CiInstagram className="react-icon" /> */}
              <AiFillInstagram className="react-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
