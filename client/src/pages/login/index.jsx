//importing base libries
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";

//importing components
import loginSvg from "../../assests/login.svg";

import SchoolLogo from "../../assests/logo.png";
//importing stylesheets
import styleCss from "./login.module.css";
//main component/page
import Footer from "../../components/footer/footer";
import { server_url } from "../../helpers/auth";

const Login = ({ history }) => {
  const setTitle = () => {
    document.title = "NCPSC || Login ";
  };
  setTitle();
  //initial state
  const initalState = {
    email: "",
    password: "",
    emailFocus: "",
    passwordFocus: "",
    loading: false,
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initalState);
  const { email, password, emailFocus, passwordFocus, loading } = formData;
  const [loginStatus, setLoginStatus] = useState(false);
  //decsribing client to login after all component render
  useEffect(() => {
    userAuthinticated();
  }, []);

  //changing input fileds
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${server_url}/api/login`, {
        email,
        password,
      });
      // console.dir(res);
      if (res.data.auth) {
        setLoginStatus(true);
        // console.log(loginStatus);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setLoginStatus(false);
        // console.log(loginStatus);
      }
    } catch (error) {
      setLoginStatus(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
      // console.dir(error);
    }
  };

  async function userAuthinticated() {
    try {
      const res = await axios.get(`${server_url}/api/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.auth) {
        navigate("/dashboard");
      }
      // console.log(res);
    } catch (error) {
      toast.info("Login to continue");
      console.dir(error);
    }
  }

  const checkValidateEmail = () => {
    const emailregex = /^([a-zA-Z0-9.])+@([a-zA-Z]+\.[a-zA-Z]+){0,3}$/;
    if (emailregex.test(email)) {
      return true;
    } else {
      // return false;
      return true;
    }
  };
  const checkValidatePassword = () => {
    if (password.trim().length >= 6) {
      return true;
    } else {
      // return false;
      return true;
    }
  };
  const classGenarator = (field) => {
    // let className = "input-field ";
    let className = `${styleCss.input_field} `;
    if (field === "email") {
      if (emailFocus) className += `${styleCss.focus} `;
      if (emailFocus === false) {
        if (email.length > 0) {
          if (checkValidateEmail()) {
            className += `${styleCss.valid_field} `;
          } else {
            className += `${styleCss.invalid_field} `;
          }
        }
      }
    }
    if (field === "password") {
      if (passwordFocus) className += `${styleCss.focus} `;
      if (passwordFocus === false) {
        if (password.length > 0) {
          if (checkValidatePassword()) {
            className += `${styleCss.valid_field} `;
          } else {
            className += `${styleCss.invalid_field} `;
          }
        }
      }
    }
    return className;
  };

  return (
    // presentation lyout
    <>
      {/* if client has login already then redirect him to login page */}
      {/* {isAuth() ? <Redirect to="/dashboard" /> : null} */}
      {/* toast container for notifications  */}
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
      {/* main design  */}
      <div className={styleCss.container}>
        <div className={styleCss.forms_container}>
          <div className={styleCss.signin_signup}>
            <form onSubmit={submit_handler} className={styleCss.sign_in_form}>
              <p className={styleCss.google_login_title}>
                Login with School Google Account
              </p>

              <img
                src={SchoolLogo}
                alt="Ncpsc"
                className={styleCss.logo_login}
              />
              <h2 className={styleCss.title}>Sign in</h2>
              <div className={classGenarator("email")}>
                <i className="fas fa-user" />
                <input
                  value={email}
                  onChange={handleChange("email")}
                  type="text"
                  placeholder="Email Adress"
                  onFocus={() => {
                    setFormData({ ...formData, emailFocus: true });
                  }}
                  onBlur={() => {
                    setFormData({
                      ...formData,
                      emailFocus: false,
                    });
                  }}
                />
              </div>
              <div className={classGenarator("password")}>
                <i className="fas fa-lock" />
                <input
                  value={password}
                  onChange={handleChange("password")}
                  type="password"
                  onFocus={() => {
                    setFormData({ ...formData, passwordFocus: true });
                  }}
                  onBlur={() => {
                    setFormData({
                      ...formData,
                      passwordFocus: false,
                    });
                  }}
                  placeholder="Password"
                />
              </div>
              {/* <Link
            to="/users/password/forget"
            className={styleCss.forget_password}
          >
            Forgot Password?
          </Link> */}

              <div className={styleCss.validation_container}>
                <span className={styleCss.message}>
                  <i className="far fa-check-circle"></i>
                  Must be a valid Email
                </span>

                <span className={styleCss.message}>
                  <i className="far fa-check-circle"></i>
                  Password Must contain 6 characters
                </span>
              </div>

              <input
                type="submit"
                defaultValue="Login"
                className={`${styleCss.btn} solid`}
              />
            </form>
          </div>
        </div>
        <div className={styleCss.panels_container}>
          <div className={`${styleCss.panel} ${styleCss.left_panel}`}>
            <div className={styleCss.content}>
              <h3>Facing any Issue?</h3>
              <Link className={`${styleCss.routeLinkBtn}`} to="/message">
                Send a Messgae
              </Link>
              <p>Tips: Login with your google account!</p>
            </div>
            <img src={loginSvg} className={styleCss.image} alt="background" />
          </div>
        </div>
      </div>
      <Footer />
      {loading ? <Loading /> : null}
    </>
  );
};

export default Login;
