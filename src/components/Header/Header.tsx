import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { HeaderProps, useHeader } from "./useHeader";
import logo from "../../assets/logoPath.png";
// import default30 from "../../assets/default30.png";

const Header: React.FC<HeaderProps> = (props) => {
  const {
    navItems,
    isNavbarActive,
    isHeaderActive,
    isMobile,
    toggleNavbar,
    // handleClick,
    closeNavbar,
  } = useHeader(props);

  return (
    <header
      className={`header ${isHeaderActive ? "active" : ""}`}
      style={{
        boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
      }}
      data-header
    >
      <div className="container">
        <Link to={"/"} className="logoDiv">
          <img src={logo} alt="Logo" className="logoImage" />
        </Link>

        <nav className={`navbar ${isNavbarActive ? "active" : ""}`} data-navbar>
          <ul className="navbar-list">
            {/* <li className="navbar-link visible-on-mobile">
              <Link
                to={`/compte`}
                className="navbar-link"
                data-nav-link
              
                onClick={undefined}
                
              >
                compte
              </Link>
            </li> */}

            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.href}`}
                  className="navbar-link"
                  data-nav-link
                  // onClick={(event) => handleClick(event, item.href)}
                  onClick={
                    item.text === "accueil" && !isMobile
                      ? undefined
                      : closeNavbar
                  }
                  // style={{ display: isMobile ? "block" : "none" }}
                >
                  {item.text}
                </Link>
              </li>
            ))}

            {/* <li className="navbar-link">
              <BiSolidUserRectangle className="navbar-icon" />
            </li> */}

            <li className="navbar-link navbar-button-login-register">
              <button className="navbar-button-login"> se connecter</button>

              <button className="navbar-button-register">s'inscrire</button>
            </li>

            {/* <li className="navbar-link hidden-on-mobile ">
              <img src={default30} alt="avatar" className="avatarLogin" />
            </li> */}
          </ul>
        </nav>

        {/* Toggle button visibility based on device type */}
        {/* // If not on mobile, show the button */}
        {((!isMobile && isHeaderActive) || isMobile) && (
          <button
            className={`nav-toggle-btn ${isNavbarActive ? "active" : ""}`}
            aria-label="toggle menu"
            data-nav-toggler
            onClick={toggleNavbar}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
