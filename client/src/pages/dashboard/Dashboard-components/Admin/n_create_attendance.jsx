import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../../../../helpers/auth";
import style from "./style_uti.module.css";
import errorHandler from "../../../../helpers/errorHandler";
import { server_url } from "../../../../helpers/auth";
import Loading from "../../../../components/loading";
const CreateOnlineAttendance = ({ history }) => {
  document.title = "NCPSC || Create Attendance";
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const create_date = e.target.date.value;
      const class_count = e.target.class_count.value;
      const create_class = e.target.create_class.value;
      const create_section = e.target.create_section.value;
      if (!create_date || !class_count || !create_class || !create_section) {
        return toast.error("Invalid Inputs");
      }
      const token = localStorage.getItem("token");
      const submit_obj = {
        create_date,
        class_count,
        create_class,
        create_section,
        _token: token,
      };
      // console.log(token);
      // console.log(submit_obj);
      const res = await axios.post(
        `${server_url}/api/create_attendance`,
        submit_obj
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(`Attendance created for ${create_date}`);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error.response.data.message || "Error!");
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
      {loading ? <Loading /> : null}
      <h3>Create Attendance</h3>
      <form onSubmit={submit_handler} className={`${style.form_2}`}>
        <div className={style.cls_div}>
          <p>Date</p>
          <input
            type="date"
            data-date-format="DD MM YYYY"
            name="date"
            id="create_date"
          />
        </div>
        <div className={style.cls_div}>
          <p>Class</p>
          <select
            className={style.input_1}
            name="create_class"
            id="create_class"
          >
            <option value="ten">TEN</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <p>Section</p>
          <select
            className={style.input_1}
            name="create_section"
            id="create_section"
          >
            <option value="kadam">KADAM</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <p>How many classes?</p>
          <select className={style.input_1} name="class_count" id="class_count">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <button className="btn btn-success" type="submit">
            Create
          </button>
          <button className="btn btn-danger" type="reset">
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateOnlineAttendance;
