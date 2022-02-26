import React, { useState } from "react";

import StudentMaleIcon from "../../../assests/student-male.svg";
import StudentFemaleIcon from "../../../assests/student-female.svg";
import adminIcon from "../../../assests/admin.svg";
import { getUser } from "../../../helpers/auth";
import { Link, NavLink } from "react-router-dom";
import addAttndCss from "../Ad_Attandance.module.css";

const AdminOptions = ({ styleObj, url, setSidebar }) => {
  // console.log(url);
  return (
    <>
      <h2>Admin Option</h2>
      {/* <div className={styleObj.sidebar__link}> */}
      <NavLink
        id="default_sidebar"
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-folder-plus" />
        Create Online Attendance
      </NavLink>

      <NavLink
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/update`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-wrench"></i>
        Update Online Attendance
      </NavLink>

      <NavLink
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/view`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-clipboard-check"></i>
        View Present Percentage
      </NavLink>

      <NavLink
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/class`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-clipboard-list"></i>
        View Online Attendance
      </NavLink>
    </>
  );
};

const StudentOptions = ({ styleObj, url, setSidebar }) => {
  return (
    <>
      <h2>Student Option</h2>

      {/* <div className={styleObj.sidebar__link}> */}
      <NavLink
        id="default_sidebar"
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-user" />
        Profile
      </NavLink>

      {/* <div className={styleObj.sidebar__link}> */}
      <NavLink
        className={(navData) =>
          navData.isActive
            ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
            : `${styleObj.sidebar__link}`
        }
        to={`/dashboard/attendance-log`}
        onClick={() => setSidebar(false)}
      >
        <i className="fas fa-folder-plus" />
        Attendance Log
      </NavLink>
    </>
  );
};

const SideBar = ({ styleObj, sideBar, setSidebar, url }) => {
  // console.log(url);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [gender, setgender] = useState("");

  const get_user = async () => {
    let data = await getUser();
    setRole(data.role);
    setName(data.name);
    setgender(data.gender);
    // console.log(await getUser());
  };
  get_user();
  if (url === "/dashboard") {
    const default_sidebar = document?.getElementById("default_sidebar");
    default_sidebar?.classList?.add(addAttndCss.act_class);
  }
  if (url !== "/dashboard") {
    const default_sidebar = document?.getElementById("default_sidebar");
    default_sidebar?.classList?.remove(addAttndCss.act_class);
  }
  //genarating profile picture base on user gender and role
  let profileIcon = StudentMaleIcon;
  try {
    if (role && role === "admin") {
      profileIcon = adminIcon;
    } else if (gender && gender === "female") {
      profileIcon = StudentFemaleIcon;
    }
  } catch (error) {
    profileIcon = StudentMaleIcon;
  }
  const adminRoleList = ["admin", "developer", "superUser"];
  return (
    <div
      className={`${styleObj.sidebar} ${
        sideBar ? styleObj.sidebar_responsive : null
      }`}
    >
      <div className={styleObj.sidebar__title}>
        <div className={styleObj.sidebar__img}>
          <img src={profileIcon} alt="logo" />
          <h3 className="mt-3 text-capitalize">{name}</h3>
          <h4
            style={{ fontSize: "100%" }}
            className="blockquote-footer ml-5 fs-3 text-capitalize sidebar_role"
          >
            {role}
          </h4>
        </div>
        {/* add event listner here  */}
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => setSidebar(false)}
        />
      </div>
      <div className={styleObj.sidebar__menu}>
        {adminRoleList.includes(role) ? (
          <AdminOptions styleObj={styleObj} url={url} setSidebar={setSidebar} />
        ) : (
          <StudentOptions
            styleObj={styleObj}
            url={url}
            setSidebar={setSidebar}
          />
        )}

        <h2>Support</h2>
        {/* <div className={styleObj.sidebar__link}> */}
        <NavLink
          className={(navData) =>
            navData.isActive
              ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
              : `${styleObj.sidebar__link}`
          }
          to={`/dashboard/change-pass`}
          onClick={() => setSidebar(false)}
        >
          <i className="fas fa-lock"></i>
          Change Password
        </NavLink>
        {/* <div className={styleObj.sidebar__link}> */}
        <NavLink
          className={(navData) =>
            navData.isActive
              ? `${styleObj.sidebar__link} ${addAttndCss.act_class}`
              : `${styleObj.sidebar__link}`
          }
          to={`/message`}
          onClick={() => setSidebar(false)}
        >
          <i className="fas fa-sms"></i>
          any problem?
        </NavLink>
        {/* </div> */}
        <div className={styleObj.sidebar__logout}>
          <i className="fa fa-power-off" />
          <Link to="/logout">Log out</Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
