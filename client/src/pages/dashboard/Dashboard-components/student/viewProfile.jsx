import React, { useEffect, useState } from "react";
import ErrorHandler from '../../../../helpers/ErrorHandlers'
import profileCssSajek from "../../profile_sajek.module.css";
import profileCssChimbuk from "../../profile_chimbuk.module.css";
import profileCssKeokradang from "../../profile_keokradang.module.css";
import profileCssBijoy from "../../profile_bijoy.module.css";
import profilePic from "../../../../assests/user-ico.png";
import axios from "axios";
import Loadding from "../../../../components/loading";
import { getuser, signout } from "../../../../helpers/auth";
import { Link } from "react-router-dom";

const ViewProfile = ({ history }) => {
  const [getData, setGetData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let postObj = {
    stId: `${getuser().id}`,
  };

  function invalid() {
    signout();
    history.push("/");
  }

  useEffect(async () => {
    document.title = "NCPSC || Profile";

    const link = "/student/getAttendance";
    setLoading(true);
    try {
      let response = await axios.post(link, postObj);
      if (response.status === 200) {
        setGetData(response);
        setLoading(false);
      }
      // else {
      //   setGetData(response);
      //   setLoading(false);
      // }
    } catch (err) {
      setError(err);
      setLoading(false);
      ErrorHandler(err, history)
    }
    // console.dir(error);
    // console.log(error.response.status);
  }, []);
  // console.dir(error);

  const Profile = () => {
    let css = [
      profileCssBijoy,
      profileCssKeokradang,
      profileCssChimbuk,
      profileCssSajek,
    ];

    function genearateCss(min, max) {
      let step1 = max - min + 1;
      let step2 = Math.random() * step1;
      let result = Math.floor(step2) + min;
      return result;
    }
    let randomCss = genearateCss(0, css.length);
    // let profileCss = css[randomCss];
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
                {getData.data.bio.Name}
              </div>
              <div className={`${profileCss.profile_info}`}>
                <div className={`${profileCss.info_head}`}>
                  <p>ID </p>
                  <p>Class </p>
                  <p>Section </p>
                  {/* <p>House </p>
                  <p>Gender </p>
                  <p>Contact </p> */}
                </div>
                <div className={`${profileCss.info}`}>
                  <p>: {getData.data.bio.Id}</p>
                  <p>: {getData.data.bio.Class}</p>
                  <p>: {getData.data.bio.Section}</p>
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
      {loading ? <Loadding /> : null}
      {error !== "" && error.response.status === 500 ? (
        <h1>Internal Server Error</h1>
      ) : null}
      {error !== "" && error.response.status === 401 ? invalid() : null}
      {getData !== "" && getData.status === 200 ? <Profile /> : null}
    </>
  );
};

export default ViewProfile;
