import React from "react";
import { Link } from "react-router-dom";
import styleObj from "./style.module.css";
const NotFoundPage = () => {
  const setTitle = () => {
    document.title = "NCPSC || 404 Page not found ";
  };
  setTitle();
  return (
    <div className={styleObj._404}>
      <div className={styleObj.box}>
        <h2>
          4 <span className={styleObj.zero}></span>4
        </h2>
        <h3>Oops! Page Not Found...</h3>
        <Link to="/">Back To HOME</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
