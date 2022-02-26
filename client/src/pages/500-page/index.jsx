import React, { useState } from "react";
import styleObj from "./style.module.css";

const InternalServerErrorPage = ({ history }) => {
  const [isToShowLoading, setIsToShowLoading] = useState(true);
  setTimeout(() => {
    setIsToShowLoading(false);
  }, 1000);
  (function setTitle() {
    document.title = "NCPSC || 500 Error";
  })();

  return (
    <>
      <div className={styleObj._500_page}>
        <h2 className={styleObj.title}>Opps! an error occurred on server.</h2>

        <div className={isToShowLoading ? styleObj.loading : null}>
          <div className={styleObj.gears}>
            <div className={`${styleObj.gear} ${styleObj.one}`}>
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
            </div>
            <div className={`${styleObj.gear} ${styleObj.two}`}>
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
            </div>
            <div className={`${styleObj.gear} ${styleObj.three}`}>
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
              <div className={styleObj.bar} />
            </div>
          </div>
        </div>
        <p className={styleObj.subTitle}>
          The Developer team has been informed. It's may take a while......
        </p>
        <button
          onClick={() => {
            history.goBack();
          }}
          className={styleObj.link}
        >
          Try again!
        </button>
      </div>
    </>
  );
};

export default InternalServerErrorPage;
