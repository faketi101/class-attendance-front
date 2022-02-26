import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  const divCss = {
    position: "fixed",
    height: "100%",
    width: "100vw",
    zIndex: "999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    background: "rgba(0,0,0,0.7)",
  };
  const textCss = {
    position: "fixed",
    top: "58%",
    left: "44%",
    color: "#00b8e6",
    zIndex: "999",
  };
  return (
    <>
      <div style={divCss}>
        <ScaleLoader
          height="70px"
          width="6px"
          radius="0px"
          margin="5px"
          color="#00b8e6"
        />
      </div>
      <h4 style={textCss}>Fetching Data...</h4>
    </>
  );
};

export default Loading;
