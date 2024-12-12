import React from "react";
import "./Overview.css";
import { OverviewProps, useOverview } from "./useOverview";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { NavItemsEnum } from "../../utils/navItems";

const Overview: React.FC<OverviewProps> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const {
    data,
    subtitle,
    title,
    disabledLink,
    createUrlFriendlyString,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useOverview(props);

  return (
    <>
      <section
        className="section portfolio"
        id={NavItemsEnum.Overview}
        aria-label="portfolio"
      >
        <div className="container">
          <p className="section-subtitle">{subtitle}</p>
          <h2 className="h2 section-title">{title}: </h2>

          <div className="view-all-button-container">
            <Link
              to={`view-all/${NavItemsEnum.Overview}`}
              className="view-all-button"
            >
              View All
              <IoArrowForwardOutline className="react-icon" size={16} />
            </Link>
          </div>

          <ul className={`flexDivScroll ${data.length <= 2 ? "" : "hidden"}`}>
            {data.length <= 2 &&
              data.map((content, index) => (
                <li
                  className="scrollbar-item"
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <div className="card" key={index}>
                    <figure
                      className="card-banner img-holder"
                      // style={{ --width: 600, --height: 675 }}
                    >
                      <img
                        src={content.photo}
                        width="600"
                        height="675"
                        loading="lazy"
                        alt={content.fullName}
                        className="img-cover saturate"
                      />
                    </figure>

                    <div className="card-content">
                      <Link
                        to={`${NavItemsEnum.Overview}/${
                          content.id
                        }/${createUrlFriendlyString(content.fullName)}`}
                        // state={{ id: index }}
                        className="card-link-to"
                        onClick={(event) =>
                          disabledLink ? event.preventDefault() : null
                        }
                      >
                        <IoArrowForwardOutline className="react-icon" />
                      </Link>

                      <h3 className="h3 card-title">
                        {/* <Link
                          to={`${keyWord}/${
                            index + 1
                          }/${createUrlFriendlyString(content.title)}`}
                          // state={{ id: index }}
                          className="card-link-to"
                        > */}
                        {content.fullName}

                        {/* </Link> */}
                      </h3>

                      <p className="card-text ">
                        {content.brief.slice(0, 60)}...
                        <Link
                          to={`${NavItemsEnum.Overview}/${
                            content.id
                          }/${createUrlFriendlyString(content.fullName)}`}
                          // state={{ id: index }}
                          className="card-link-to inline-block disableToUppercase"
                          onClick={(event) =>
                            disabledLink ? event.preventDefault() : null
                          }
                          style={{
                            paddingLeft: "5px",
                            color: "var(--theme-color)",
                          }}
                        >
                          see details
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <ul className="has-scrollbar">
            {data.length > 2 &&
              data.map((content, index) => (
                <li
                  className="scrollbar-item"
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <div className="card">
                    <figure
                      className="card-banner img-holder"
                      // style={{ --width: 600, --height: 675 }}
                    >
                      <img
                        src={content.photo}
                        width="600"
                        height="675"
                        loading="lazy"
                        alt={content.fullName}
                        className="img-cover saturate"
                      />
                    </figure>

                    <div className="card-content">
                      <Link
                        to={`${NavItemsEnum.Overview}/${
                          content.id
                        }/${createUrlFriendlyString(content.fullName)}`}
                        onClick={(event) =>
                          disabledLink ? event.preventDefault() : null
                        }
                        // state={{ id: index }}
                        className="card-link-to"
                      >
                        <IoArrowForwardOutline className="react-icon" />
                      </Link>

                      <h3 className="h3 card-title">
                        {/* <Link
                          to={`${keyWord}/${
                            index + 1
                          }/${createUrlFriendlyString(content.title)}`}
                          // state={{ id: index }}
                          className="card-link-to"
                        > */}
                        {content.fullName}
                        {/* </Link> */}
                      </h3>

                      <p className="card-text ">
                        {content.brief.slice(0, 60)}...
                        <Link
                          to={`${NavItemsEnum.Overview}/${
                            content.id
                          }/${createUrlFriendlyString(content.fullName)}`}
                          // state={{ id: index }}
                          className="card-link-to inline-block disableToUppercase"
                          onClick={(event) =>
                            disabledLink ? event.preventDefault() : null
                          }
                          style={{
                            paddingLeft: "5px",
                            color: "var(--theme-color)",
                          }}
                        >
                          see details
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>
              ))}

            {data.length === 0 && (
              <>
                <p>Overview is not available yet.</p>
              </>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Overview;
