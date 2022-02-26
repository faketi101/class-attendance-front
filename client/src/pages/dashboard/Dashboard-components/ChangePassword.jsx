import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, server_url } from "../../../helpers/auth";
import style from "./pass.module.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import errorHandler from "../../../helpers/errorHandler";
import Loading from "../../../components/loading";
const ChangePassword = () => {
  document.title = "NCPSC || Change Password";
  const [u_ser, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const checkAuth = async () => {
    let b_user = await getUser();
    setUser(b_user);
  };

  useEffect(() => {
    checkAuth();
  }, []);
  if (!u_ser) {
    navigate("/");
  }
  const err_reset = () => {
    const n = document.getElementById("new_pass");
    const cn = document.getElementById("con_new_pass");
    const new_pass_err = document.getElementById("new_pass_err");
    const con_new_pass_err = document.getElementById("con_new_pass_err");
    n.classList.remove(style.matched);
    cn.classList.remove(style.matched);
    n.classList.remove(style.not_matched);
    cn.classList.remove(style.not_matched);
    new_pass_err.classList.remove(style.matched);
    con_new_pass_err.classList.remove(style.matched);
    con_new_pass_err.innerText = "";
    new_pass_err.innerText = "";
  };
  const inpUpdate = (e) => {
    const n = document.getElementById("new_pass");
    const cn = document.getElementById("con_new_pass");
    const new_pass_err = document.getElementById("new_pass_err");
    const con_new_pass_err = document.getElementById("con_new_pass_err");

    const con_pass = e.target.value;
    // console.log(n.value);
    // console.log(con_pass);

    if (con_pass === n.value) {
      cn.classList.remove(style.not_matched);
      new_pass_err.classList.remove(style.not_matched);
      con_new_pass_err.classList.remove(style.not_matched);

      cn.classList.add(style.matched);
      n.classList.add(style.matched);
      new_pass_err.classList.add(style.matched);

      con_new_pass_err.classList.add(style.matched);

      con_new_pass_err.innerText = "Matched";
      new_pass_err.innerText = "Matched";
    }
    if (con_pass !== n.value) {
      n.classList.remove(style.matched);
      cn.classList.remove(style.matched);
      new_pass_err.classList.remove(style.matched);
      con_new_pass_err.classList.remove(style.matched);

      n.classList.add(style.not_matched);
      cn.classList.add(style.not_matched);
      new_pass_err.classList.add(style.not_matched);
      con_new_pass_err.classList.add(style.not_matched);
      new_pass_err.innerText = "Not Matched";

      con_new_pass_err.innerText = "Not Matched";
    }
  };
  const form_handler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const pre_pass = e.target.pre_pass.value;
      const new_pass = e.target.new_pass.value;
      const con_new_pass = e.target.con_new_pass.value;
      const _token = localStorage.getItem("token");

      if (!pre_pass || !new_pass || !con_new_pass) {
        setLoading(false);

        return toast.error("All inputs must be filled!!");
      }

      if (new_pass !== con_new_pass) {
        setLoading(false);

        return toast.error("New Password and Confirm Password not Matched!");
      }

      let submit_obj = { pre_pass, new_pass, _token };

      const res = await axios.post(
        `${server_url}/api/change_password`,
        submit_obj
      );

      if (res.data.success) {
        toast.success(res.data.message);
        e.target.reset();
        err_reset();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      errorHandler(error);
      setLoading(false);
    }
  };
  const PassForm = () => {
    return (
      <>
        <div className={style.loginbox}>
          <div className={style.avatar}>
            <i className={`fas fa-user ${style.user_av}`}></i>
          </div>
          <h1>Hi, {u_ser?.name?.toUpperCase()}</h1>
          <form onSubmit={form_handler}>
            <input
              id="pre_pass"
              type="password"
              name="pre_pass"
              placeholder="Enter Current Password"
            />
            <p>
              New Password <span id="new_pass_err"></span>
            </p>
            <input
              id="new_pass"
              type="password"
              name="new_pass"
              placeholder="Enter New Password"
            />
            <p>
              Confirm Password <span id="con_new_pass_err"></span>
            </p>
            <input
              id="con_new_pass"
              type="password"
              name="con_new_pass"
              placeholder="Confirm New Password"
              onChange={inpUpdate}
            />

            <input type="submit" value="Change Password" name />
          </form>
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
      {loading ? <Loading /> : null}
      {u_ser ? <PassForm /> : <Loading />}
    </>
  );
};

export default ChangePassword;
