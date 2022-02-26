//libriaues
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
//components
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../../components/loading";
import style from "./sendMessage.module.css";
//images that required
import phonePng from "../../../../assests/phone.png";
import emailPng from "../../../../assests/email.png";
// import locationPng from "../../../../assests/location.png";
import Footer from "../../../../components/footer/footer";
import errorHandler from "../../../../helpers/errorHandler";
import { getUser } from "../../../../helpers/auth";
const SendAMessage = ({ history }) => {
  const [user, setUser] = useState("");
  const userFind = async () => {
    try {
      let u = await getUser();
      setUser(u);
    } catch (error) {
      
    }
  };
  useEffect(() => {
    userFind();
  }, []);
  const setTitle = () => {
    document.title = "NCPSC || Message";
  };
  setTitle();
  const initialState = {
    message: "",
    messageFocus: false,
    isloading: false,
  };
  const [formData, setFormData] = useState(initialState);

  const { message, messageFocus, isloading } = formData;
  //store react sate when user type on input fiel
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const checkValidaiton = (e) => {
    //@TODO: improve here later
    const message = e.target.message.value;
    if (message.length > 9 && message.length < 151) {
      return true;
    } else return false;
  };
  //handle form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValidaiton(e)) {
      setFormData({ ...formData, isloading: true });
      let email = user?.email || "not mentioned";
      let name = user?.name || "not mentioned";
      let subject = "NCPSC Support";
      let message = e.target.message.value;
      let _pa = "message?true?";

      let send_obj = { email, name, subject, message, _pa };
      axios
        .post(`https://server.faketi.xyz/api/send_message`, send_obj)
        .then((res) => {
          setFormData({ ...formData, isloading: false });
          if (res.data.success) {
            e.target.reset();
            toast.success("Your message has been sent. Thank you.");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again later...");
          setFormData({ ...formData, isloading: false });
          errorHandler(err);
        });
    } else {
      toast.error("Message length must between 10 to 150");
    }
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
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.contact_info}>
            <h2 className={style.title}>Facing any issues?</h2>
            <p className={style.text}>
              This is a beta project. so there might be some issues with this
              web app. let us know about your problem. we will contact you
              through email
            </p>
            <p className={style.devLink}>
              Would you like to see peoples behind this project?
              <Link to="/developers" className={style.route_link}>
                Developers
              </Link>
            </p>
            <div className={style.info}>
              {/* <div className={style.information}>
                <img
                  src={locationPng}
                  className={style.icon}
                  alt="location icon"
                />
                <p>Ncpsc, Dhaka cantonment, Dhaka-1206</p>
              </div> */}
              <div className={style.information}>
                <img src={emailPng} className={style.icon} alt="email icon" />
                <p>admin@faketi.me</p>
              </div>
              <div className={style.information}>
                <img src={phonePng} className={style.icon} alt="phone icon" />
                <p>+8801533837578</p>
              </div>
            </div>
            <div className={style.social_media}>
              <p>Contact with us :</p>
              <div className={style.social_icons}>
                <a href="https://faketi.me" target="_blank" rel="noreferrer">
                  <i className="fab fa-chrome"></i>
                </a>
                <a
                  href="https://www.facebook.com/fake.ti.101/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://github.com/faketi101"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
          </div>
          <div className={style.contact_form}>
            <span className={`${style.circle} ${style.one}`} />
            <span className={`${style.circle} ${style.two}`} />
            <form
              onSubmit={handleSubmit}
              className={style.contact_us_main_form}
              autoComplete="off"
            >
              <h3 className={style.title}>Send Message to Developer</h3>

              <div
                className={`${style.input_container} ${style.textarea} ${
                  messageFocus === true ? style.focus : null
                }`}
              >
                <textarea
                  id="contact-us-message"
                  name="message"
                  className={style.input}
                  value={message}
                  onChange={handleChange("message")}
                  onFocus={() => {
                    setFormData({ ...formData, messageFocus: true });
                  }}
                  onBlur={() => {
                    message.length === 0 &&
                      setFormData({ ...formData, messageFocus: false });
                  }}
                />
                <label htmlFor="contact-us-message">Message</label>
                <span>Message</span>
              </div>
              <div className={style.validation_container}>
                <span className={style.message}>
                  <i className="far fa-check-circle"></i>
                  Message must be written between 10 to 150 character
                </span>
              </div>
              <input type="submit" defaultValue="Send" className={style.btn} />
              <Link to={"/"} className={`${style.btn} btn`}>
                {" "}
                Back to Home{" "}
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      {isloading ? <Loading /> : null}
    </>
  );
};

export default SendAMessage;
