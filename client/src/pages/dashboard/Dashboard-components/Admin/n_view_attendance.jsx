import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import SViewTable from "./N_ViewTable";
import { bdDate } from "../../../../helpers/attendanceCounter";
import style from "./style_uti.module.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../helpers/auth";
import errorHandler from "../../../../helpers/errorHandler";
import Loading from "../../../../components/loading";
import { server_url } from "../../../../helpers/auth";
const ViewAttendance = () => {
  document.title ="NCPSC || View Attendance"

  const [resData, setResData] = useState("");
  const [inputs, setInputs] = useState("");
  const [loading, setLoading] = useState(false);


  const [u_ser, setUser] = useState("");
  
  let navigate = useNavigate();

  const checkAuth = async () => {
    let b_user = await getUser();
    // console.log(b_user);
    setUser(b_user);
  };
  if (u_ser && u_ser.role !== "admin") {
    navigate("/404");
  }
  useEffect(() => {
    checkAuth();
  }, []);

  // console.log(bdDate());

  // const [viewSection, setViewSection] = useState("");
  const submit_handler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const from_date = e.target.from_date.value;
      const to_date = e.target.to_date.value;
      const view_class = e.target.view_class.value;
      const view_section = e.target.view_section.value;
      const view_id = e.target.view_id.value;
      const _token = localStorage.getItem("token");

      const submit_obj = {
        from_date,
        to_date,
        view_class,
        view_section,
        view_id,
        _token,
      };
      setInputs(submit_obj);
      // console.log(submit_obj);
      const res = await axios.post(
        `${server_url}/api/view_attendance`,
        submit_obj
      );
      if (res.data.success) {
        // console.log(res.data);
        
        setResData(res.data);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Error!");
      errorHandler(error);
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
      <h3>View Attendance</h3>
      <form onSubmit={submit_handler} className={`${style.form_2}`}>
        <div className={style.cls_div}>
          <p>From date:</p>
          <input
            type="date"
            name="from_date"
            id="from_date"
            defaultValue={bdDate().date}
          />
        </div>
        <div className={style.cls_div}>
          <p>To date: </p>
          <input type="date" name="to_date" id="to_date" />
        </div>

        <div className={style.cls_div}>
          <p>View Class:</p>
          <select className={style.input_1} name="view_class" id="view_class">
            <option value="ten">TEN</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <p>View Section:</p>
          <select
            className={style.input_1}
            name="view_section"
            id="view_section"
          >
            <option value="" selected>
              Select Section
            </option>
            <option value="kadam">KADAM</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <p>Student ID:</p>
          <input
            placeholder="Student ID"
            className={style.input_1}
            type="text"
            name="view_id"
          />
        </div>
        <div className={style.cls_div}>
          <button
            id="view_submit_btn"
            type="submit"
            className={`btn btn-success shadow-none ${style.button}`}
          >
            VIEW ATTENDANCE
          </button>

          <button
            id="view_reset_btn"
            type="reset"
            className={`btn btn-danger shadow-none ${style.button}`}
          >
            RESET
          </button>
        </div>
      </form>
      {loading ? <Loading /> : null}
      {resData ? <SViewTable data={resData.data} inputs={inputs} /> : null}
    </>
  );
};

export default ViewAttendance;
