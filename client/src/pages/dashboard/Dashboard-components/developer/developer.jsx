import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Loadding from "../../../../components/loading";
import { ToastContainer, toast } from "react-toastify";
import devCss from "./developer.module.css";
import ErrorHandler from "../../../../helpers/ErrorHandlers";
const collaps = (data, index) => {
  // console.log(data);
  const copytoclip = () => {
    let copyText = document.getElementById(`_inp${index}`);
    copyText?.select();
    document.execCommand("Copy");
    toast.success("Copied to clipboard");
  };
  return (
    <>
      <div className="accordion" id="accordionExample" key={index}>
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className={`${devCss.outline_none} btn`}
                type="button"
                data-toggle="collapse"
                data-target={`#__${index}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span
                  className={`${devCss.headinng} ${
                    !data.Checked ? devCss.checked_false : devCss.checked_true
                  }`}
                >
                  {data.Error.Message}
                </span>
                <span className={`${devCss.head_time}`}>{data.Time}</span>
              </button>
            </h5>
          </div>
          <div
            id={`__${index}`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Error</th>
                    <th>{data.Time}</th>
                  </tr>
                  <tr>
                    <td>Column Number</td>
                    <td>{data.Error.ColumnNumber}</td>
                  </tr>
                  <tr>
                    <td>File Number</td>
                    <td>{data.Error.FileNumber}</td>
                  </tr>
                  <tr>
                    <td>Line Number</td>
                    <td>{data.Error.LineNumber}</td>
                  </tr>
                  <tr>
                    <td>Message</td>
                    <td>{data.Error.Message}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{data.Error.Name}</td>
                  </tr>
                  <th>Request</th>
                  <th></th>
                  <tr>
                    <td>Base URL</td>
                    <td>{data.Request.baseUrl}</td>
                  </tr>
                  <tr>
                    <td>Body</td>
                    <td>{data.Request.Body}</td>
                  </tr>
                  <tr>
                    <td>Cookies</td>
                    <td>
                      <input
                        id={`_inp${index}`}
                        value={data.Request.Cookies}
                        onClick={copytoclip}
                        readOnly={true}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>IP</td>
                    <td>{data.Request.Ip}</td>
                  </tr>
                  <tr>
                    <td>Original URL</td>
                    <td>{data.Request.originalUrl}</td>
                  </tr>
                  <tr>
                    <td>Protocol</td>
                    <td>{data.Request.Protocol}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Developer = ({ history }) => {
  const [getData, setGetData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const link = "/developer/errorLog";
    setLoading(true);
    try {
      let response = await axios.post(link);
      if (response.status === 200) {
        setGetData(response);
        // console.log(getData);
        setLoading(false);
      }
    } catch (err) {
      ErrorHandler(err, history);
      toast.error(err.response);
      setLoading(false);
    }
    // console.dir(error);
    // console.log(error.response.status);
  }, []);
  // console.log(getData);
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
      {getData ? getData.data[0]?.ServerErrors.map(collaps) : null}
    </>
  );
};

export default Developer;
