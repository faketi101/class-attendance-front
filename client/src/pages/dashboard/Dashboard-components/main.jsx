import React from "react";
import { Outlet } from "react-router-dom";
// import { getUser } from "../../../helpers/auth";

// import Loading from "../../../components/loading";

const MainContent = ({ styleObj, path }) => {
  // console.log("from main content", path);
  return (
    <main id="_main" className={styleObj.main}>
      <div className={styleObj.main__container}>
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;
