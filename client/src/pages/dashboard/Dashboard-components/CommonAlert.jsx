import addAttndCss from "../Ad_Attandance.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CommonAlert = (props) => {
  // setTimeout(CommonAlert(), 3000)
  return (
    <>
      <div
        className={`alert alert-danger alert-dismissible fade show ${addAttndCss.bottomTop}`}
        role="alert"
      >
        <strong>{`${props.type.toUpperCase()}  `} </strong>{" "}
        {props.alert.response.data}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};
