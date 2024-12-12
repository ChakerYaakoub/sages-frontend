import React from "react";
import "./DescriptionPage.css";
import { useDescriptionPage, DescriptionPageProps } from "./useDescriptionPage";

const DescriptionPage: React.FC<DescriptionPageProps> = (props) => {
  const { data, photo, description } = useDescriptionPage(props);

  return (
    <div className="container">
      <div className="DescriptionPageMain">
        <div className="imageDesc hiddenImagePC">
          <img src={photo} alt="image" />
        </div>
        <div className="paragraphDesc">
          <h1 className="my-section-subtitle"> {data.fullName}</h1>
          <span className={`newsDate `}>Published on {data.date}</span>

          <h3 className="h3 my-section-title"> {data.brief} </h3>
          <div className="imageDesc hiddenImageMobile">
            <img src={photo} alt="" />
          </div>
          <div
            className="descriptionText"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>

      <div className="descriptionSecond0 ">
        <div className="LinksDesc LinksDesc2 ">
          <p className="hiddenImageMobile" style={{ color: "transparent" }}>
            .
          </p>

          <p> Contact Information:</p>

          <ul>
            <li>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </li>
            <li>
              <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a>
            </li>
            <li>{data.address}</li>
          </ul>
        </div>
      </div>

      <div className="descriptionSecond  hidden  ">
        <div className="LinksDesc">
          <p> Contact Information:</p>

          <ul>
            <li>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </li>
            <li>
              <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a>
            </li>
            <li>{data.address}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
