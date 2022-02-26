// import style from "../Admin/style_uti.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import profileCssSajek from "../../profile_sajek.module.css";

import stMaleIco from "../../../../assests/student-male.svg";
import stFemaleIco from "../../../../assests/student-female.svg";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading";
import axios from "axios";
import errorHandler from "../../../../helpers/errorHandler";
import { server_url } from "../../../../helpers/auth";
import { counter } from "../../../../helpers/attendanceCounter";
const StudentProfile = ({ user }) => {
  document.title = "NCPSC || Profile";
  // const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState("");

  const get_attendance = async () => {
    try {
      setLoading(true);
      const _token = localStorage.getItem("token");
      const view_id = user?.school_id;
      let obj = { _token, view_id };
      let res = await axios.post(
        `${server_url}/api/view_attendance_classes`,
        obj
      );
      if (res.data.success) {
        toast.success(`Welcome back ${user.name}`);
        setLoading(false);

        setAttendance(res.data);
      }
    } catch (error) {
      setLoading(false);

      errorHandler(error);
    }
  };

  useEffect(() => {
    get_attendance();
  }, [user]);

  const Profile = () => {
    // let profileCss = css[randomCss];
    document.title = `NCPSC || ${user.name.toUpperCase()}`;
    const attend_data = counter(attendance.data);
    // console.log(attend_data);
    let profilePic = stMaleIco;
    if (user.gender === "female") {
      profilePic = stFemaleIco;
    }
    let profileCss = profileCssSajek;
    // if (getData.data.bio.House === "Sajek") {
    //   profileCss = profileCssSajek;
    // } else if (getData.data.bio.House === "Chimbuk") {
    //   profileCss = profileCssChimbuk;
    // } else if (getData.data.bio.House === "Keokradang") {
    //   profileCss = profileCssKeokradang;
    // } else if (getData.data.bio.House === "Bijoy") {
    //   profileCss = profileCssBijoy;s
    // } else {
    //   profileCss = profileCssSajek;
    // }
    return (
      <>
        <div className={`${profileCss.profile_card_wrap}`}></div>
        <div className={`${profileCss.content}`}>
          <div className={`${profileCss.profile_card}`}>
            <div className={`${profileCss.card_header}`}>
              <div className={`${profileCss.pic}`}>
                <img src={profilePic} alt="" />
              </div>
              <div className={`${profileCss.name}`}>
                {user.name.toUpperCase()}
              </div>
              <div className={`${profileCss.profile_info}`}>
                <div className={`${profileCss.info_head}`}>
                  <p>ID </p>
                  <p>Class </p>
                  <p>Section </p>
                  <p>Total Class </p>
                  <p>Total Present </p>
                  <p>Total Absent </p>
                  <p>Present % </p>

                  {/* <p>House </p>
                  <p>Gender </p>
                  <p>Contact </p> */}
                </div>
                <div className={`${profileCss.info}`}>
                  <p>: {`${user.school_id}`}</p>
                  <p>: {user.class.toUpperCase()}</p>
                  <p>: {user.section.toUpperCase()}</p>
                  <p>: {attend_data.class_count}</p>
                  <p>: {attend_data.presents.length}</p>
                  <p>: {attend_data.absents.length}</p>
                  <p>: {attend_data.present_percent.toFixed(2)}%</p>
                  {/* <p>: {getData.data.bio.House}</p>
                  <p>: {getData.data.bio.Gender}</p>
                  <p>: {getData.data.bio.FatherContact}</p> */}
                </div>
              </div>
              <Link
                to="/dashboard/attendance-log"
                className={`${profileCss.contact_btn}`}
              >
                Goto Attendance
              </Link>
            </div>
            <div className={`${profileCss.card_footer}`}></div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {attendance ? <Profile user={user} /> : null}
      {loading ? <Loading /> : null}
    </>
  );
};

export default StudentProfile;
