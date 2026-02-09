// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation() || {};

  useEffect(() => {
    // Optional: if you want to do something on navigation,
    // otherwise just scroll
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
