import React from "react";
import schoolLogo from "../../../assests/logo.png";

const NavBar = ({ styleObj, setSidebar }) => {
  return (
    <nav className={styleObj.navbar}>
      <div className={styleObj.nav_icon}>
        <i
          className="fa fa-bars"
          aria-hidden="true"
          onClick={() => {
            setSidebar(true);
          }}
        />
      </div>
      <div className={styleObj.navbar__right}>
        <span>Nirjhor cantonment public school and college</span>
        <a href="https://ncpsc.edu.bd">
          <img width={30} src={schoolLogo} alt="School logo " />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
