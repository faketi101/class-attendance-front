import devCss from "./developer.module.css";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import d2 from "../../assests/d2.jpg";

let developers = [
  {
    profile: d2,
    name: "!FAKETI",
    post: "Developer",
    fb_link: "https://www.facebook.com/fake.ti.101",
    git_link: "https://www.github.com/faketi101",
    email: "mailto:coding.beast.404@gmail.com",
  },
];

const Card = ({ profile, name, post, fb_link, git_link, email_link }) => (
  <div className={`${devCss.our_team}`}>
    <div className={`${devCss.pic}`}>
      <img src={profile} alt="developer" srcSet />
    </div>
    <div className={`${devCss.team_content}`}>
      <h3 className={`${devCss.tittle} text-dark`}>{name}</h3>
      <span className={`${devCss.post}`}>{post}</span>
    </div>
    <ul className={`${devCss.social}`}>
      <li>
        <a
          target="_blank"
          href={fb_link}
          rel="noreferrer"
          className="fab fa-facebook"
        ></a>
      </li>
      <li>
        <a
          target="_blank"
          href={git_link}
          rel="noreferrer"
          className="fab fa-github"
        ></a>
      </li>
      <li>
        <a
          target="_blank"
          href={email_link}
          rel="noreferrer"
          className="fas fa-envelope"
        ></a>
      </li>
    </ul>
  </div>
);
const Dev_card = (props) => {
  return (
    <>
      <div className="container my-5">
        <div className={`${devCss.dev_vard}`}>
          <h4 className="display-4 text-center mb-3 dev_title">
            Developers Behind This Project
          </h4>
          <div className={`${devCss.container}`}>
            {developers.map((d) => (
              <Card
                profile={d.profile}
                post={d.post}
                name={d.name}
                fb_link={d.fb_link}
                git_link={d.git_link}
                email_link={d.email}
              />
            ))}
          </div>
          <div className="my-5 mx-auto text-center">
            <Link to="/" className="btn  btn-outline-dark">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dev_card;
