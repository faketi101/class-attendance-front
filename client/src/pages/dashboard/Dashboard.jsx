import React, { useEffect, useState } from "react";
import { getUser, isAuth } from "../../helpers/auth";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Dashboard-components/navBar";
import MainContnet from "./Dashboard-components/main";
import SideBar from "./Dashboard-components/sideBar";
import Footer from "../../components/footer/footer";
//css file
import css from "./dashboard.module.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;
  let url = location.pathname;

  const [sideBar, setSidebar] = useState(false);

  const [u_ser, setUser] = useState("");

  const checkAuth = async () => {
    let b_user = await getUser();
    setUser(b_user);
  };
  if (!u_ser) {
    navigate("/");
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      {isAuth() ? null : navigate("/")}
      <div className={css.container}>
        <NavBar styleObj={css} setSidebar={setSidebar} />
        <MainContnet styleObj={css} path={path} />
        <SideBar
          styleObj={css}
          sideBar={sideBar}
          setSidebar={setSidebar}
          url={url}
        />
      </div>
        <Footer/>
    </>
  );
};

export default Dashboard;
