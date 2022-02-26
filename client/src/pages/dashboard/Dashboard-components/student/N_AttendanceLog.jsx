import style from "../Admin/style_uti.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import StudentTable from "../Admin/N_StudentTable";
import { getUser, server_url } from "../../../../helpers/auth";
import Loading from "../../../../components/loading";
import errorHandler from "../../../../helpers/errorHandler";
const StudentAttendanceLog = () => {
  document.title = "NCPSC || View Attendance";
  const [stData, setStData] = useState("");
  const [inputs, setInputs] = useState("");
  const [loading, setLoading] = useState(false);
  const [rev, setRev] = useState("");
  const submit_handler_st = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      let user = await getUser();
      const view_id = user.school_id;
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message || "Error!");
      errorHandler(error);
    }
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
            <button
              className={`btn btn-info text-white fw-bold shadow-none `}
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

      <h3 className="text-info">Student Attendance Log</h3>
      <IdWise />
      {stData && rev ? (
        <StudentTable d={stData} inputs={inputs} rev={rev} />
      ) : null}
      {loading ? <Loading /> : null}
    </>
  );
};
export default StudentAttendanceLog;
