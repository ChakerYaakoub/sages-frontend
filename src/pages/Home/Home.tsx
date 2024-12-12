import "./Home.css";
import { useHome, HomeProps } from "./useHome";

import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
import homePhoto from "../../assets/homePhoto.png";
import Tool from "../../components/Tool/Tool";
import { NavItemsEnum } from "../../utils/navItems";

const Home: React.FC<HomeProps> = (props) => {
  const {
    aboutUs,
    contactUs,
    tools,
    visibleTools,
    showAll,
    displayCount,
    setShowAll,
  } = useHome(props);

  return (
    <div>
      <section className="hero" id={NavItemsEnum.Accueil}>
        <div className="home-container1 ">
          <div className="home-container1-text">
            <h1 className="welcome-text">
              Bienvenue à la collaboration{" "}
              <span className="welcome-text-span">SAGES</span> et{" "}
              <span className="welcome-text-span">l'Université de Corse</span>
            </h1>
            <h2 className="welcome-text-2">
              Une solution innovante pour gérer vos documents PDF
            </h2>
          </div>

          <div className="home-container1-image">
            <img src={homePhoto} alt="logo" className="" />
          </div>
        </div>
      </section>

      <section className=" section  " id={NavItemsEnum.Services}>
        <div className="container">
          <p className="section-subtitle">Découvrez nos outils</p>

          <h2 className="h2 section-title">à votre service</h2>
          <div className="tools">
            {visibleTools.map((tool) => (
              <Tool key={tool.title} {...tool} />
            ))}
          </div>
          {tools.length > displayCount && (
            <button
              className="see-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>
      </section>

      <AboutUs aboutUs={aboutUs} />
      <ContactUs contactUs={contactUs} />
    </div>
  );
};

export default Home;
