import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { filter } from "../../../../helpers/attendanceCounter";
import ViewTableSection from "./N_ViewTableSec";
import style from "./style_uti.module.css";
import StudentTable from "./N_StudentTable";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../helpers/auth";
import errorHandler from "../../../../helpers/errorHandler";
import { server_url } from "../../../../helpers/auth";
const ViewAttendanceClasses = () => {
  document.title ="NCPSC || View Attendance"
  const [showStInp, setShowStInp] = useState(false);
  const [data, setData] = useState("");
  const [inputs, setInputs] = useState("");
  const [rev, setRev] = useState("");
  const [stData, setStData] = useState("");

  const [u_ser, setUser] = useState("");
  let navigate = useNavigate();

  const checkAuth = async () => {
    let b_user = await getUser();
    setUser(b_user);
  };
  if (u_ser && u_ser.role !== "admin") {
    navigate("/404");
  }
  useEffect(() => {
    checkAuth();
  }, []);

  const submit_handler = async (e) => {
    try {
      e.preventDefault();
      const view_date = e.target.view_date.value;
      const view_class = e.target.view_class.value;
      const view_section = e.target.view_section.value;
      // const view_date = e.target.view_date.value;
      const _token = localStorage.getItem("token");
      if (!view_class || !view_date || !view_section) {
        return toast.error("Invalid Inputs!");
      }
      let submit_obj = {
        view_class,
        view_date,
        view_section,
        _token,
      };
      setInputs(submit_obj);
      const res = await axios.post(
        `${server_url}/api/view_attendance_classes`,
        submit_obj
      );
      if (res.data.success) {
        // console.log(res.data);

        setData(filter(res));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error!");
      errorHandler(error);
    }
  };
  const submit_handler_st = async (e) => {
    try {
      e.preventDefault();
      const view_id = e.target.view_id.value;
      const view_date = e.target.view_date.value;
      const _token = localStorage.getItem("token");

      if (!view_id) return toast.error("No Student ID Filled!");
      let submit_obj = { view_date, view_id, _token };
      setInputs(submit_obj);

      const res = await axios.post(
        `${server_url}/api/view_attendance_classes`,
        submit_obj
      );
      if (res.data.success) {
        setRev(res.data.data.online_attendance.reverse());
        setStData(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      console.dir(error);
      toast.error(error?.response?.data?.message || "Error!");
    }
  };
  const inputs_view = () => {
    setData("");
    setStData("");
    if (showStInp) {
      setShowStInp(false);
    } else {
      setShowStInp(true);
    }
  };
  const SectionWise = () => {
    return (
      <>
        <form
          id="view_form"
          onSubmit={submit_handler}
          className={`${style.form_2}`}
        >
          <div className={style.cls_div}>
            <p>Date: </p>
            <input type="date" name="view_date" />
          </div>
          <div className={style.cls_div}>
            <p>Class: </p>
            <select className={style.input_1} name="view_class" id="view_class">
              <option value="ten">TEN</option>
            </select>
          </div>

          <div className={style.cls_div}>
            <p>Section: </p>
            <select
              className={style.input_1}
              name="view_section"
              id="view_section"
            >
              <option value="kadam">KADAM</option>
            </select>
          </div>
          <br />
          <div className={style.cls_div}>
            <button
              className={`btn btn-success shadow-none `}
              id="view_submit_btn"
              type="submit"
            >
              View Attendance
            </button>
            <button
              className={`btn btn-danger shadow-none `}
              id="view_submit_btn"
              type="reset"
            >
              Reset Inputs
            </button>
          </div>
        </form>
      </>
    );
  };
  const IdWise = () => {
    return (
      <>
        <form
          action=""
          onSubmit={submit_handler_st}
          className={`${style.form_2}`}
        >
          <div className={style.cls_div}>
            <p>Date:</p>
            <input type="date" placeholder="" name="view_date" />
          </div>
          <div className={style.cls_div}>
            <p>Student ID:</p>
            <input type="text" placeholder="Enter Student ID" name="view_id" />
          </div>
          <div className={style.cls_div}>
            <button
              className={`btn btn-success shadow-none `}
              id="view_submit_btn"
              type="submit"
            >
              View Attendance
            </button>
            <button
              className={`btn btn-danger shadow-none `}
              id="view_submit_btn"
              type="reset"
            >
              Reset Inputs
            </button>
          </div>
        </form>
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
      <h3>
        {showStInp ? "Searching by Student ID:" : "Searching By Section:"}
      </h3>
      <button
        className={`btn shadow-none text-white fw-bold ${
          showStInp ? "btn-success" : "btn-dark"
        }`}
        onClick={inputs_view}
      >
        {showStInp ? "Search By Section" : "Search By Student ID"}
      </button>
      {showStInp ? <IdWise /> : <SectionWise />}
      {data ? <ViewTableSection props={data} inputs={inputs} /> : null}
      {stData && rev ? (
        <StudentTable d={stData} inputs={inputs} rev={rev} />
      ) : null}
    </>
  );
};

export default ViewAttendanceClasses;
