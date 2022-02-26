import style from "./footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className={`text-white text-center text-lg-start ${style.footer}`}>
      <div
        className="text-center p-3"
        style={{ backgroundcolor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright: {""}
        <Link className="text-light text-uppercase" to="/developers">
          TARIKUL ISLAM
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
