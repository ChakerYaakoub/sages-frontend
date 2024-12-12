import { useEffect, useState } from "react";
// import { navItems } from "../../utils/navItems";
import { useLocation } from "react-router-dom";
import { navItems } from "../../utils/navItems";

export type HeaderProps = object;
export const useHeader = (props: HeaderProps) => {
  const location = useLocation();

  const [isNavbarActive, setNavbarActive] = useState(false);
  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateMedia = () => {
      //  Check if the window width is less than or equal to 992px
      setIsMobile(window.innerWidth <= 992);

      // If the window width is greater than or equal to 992px, show the navbar (pc)
      if (window.innerWidth >= 992) {
        setNavbarActive(true);
      }
    };

    //  Add event listener for window resize
    window.addEventListener("resize", updateMedia);
    updateMedia(); // Call it on initial load

    return () => {
      window.removeEventListener("resize", updateMedia); // Clean up event listener
    };
  }, []);

  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
  };

  const closeNavbar = () => {
    setNavbarActive(false);
  };
  useEffect(() => {
    // Check if the URL contains a hash
    const hash = location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      // old version
      // if (targetElement) {
      //   targetElement.scrollIntoView({ behavior: "smooth" });
      // }

      if (targetElement) {
        // Delay the scroll slightly to ensure the page is ready
        let px = 50;
        if (isMobile) {
          px = 10;
        }
        setTimeout(() => {
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset - px;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location, isMobile]);

  // const handleClick = (
  //   event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   targetId: string
  // ) => {
  //   event.preventDefault();
  //   closeNavbar();

  //   const targetElement = document.getElementById(targetId);
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: "smooth" });
  //     console.log("targetElement:", targetElement);
  //   }

  //   // Update the URL hash without causing a page refresh
  //   window.history.pushState(null, "", `${targetId}`);
  // };

  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled down more than 100px
      if (window.scrollY > 100) {
        setHeaderActive(true);

        closeNavbar();
      } else {
        setHeaderActive(false);
        // if its a large screen, active the navbar
        if (!isMobile) setNavbarActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return {
    ...props,
    navItems,
    isNavbarActive,
    isHeaderActive,
    isMobile,
    toggleNavbar,
    closeNavbar,
    // handleClick,
  };
};
