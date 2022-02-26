import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Table from "./N_Table";
import { bdDate, filter } from "../../../../helpers/attendanceCounter";
import style from "./style_uti.module.css";
import { server_url } from "../../../../helpers/auth";
import { getUser } from "../../../../helpers/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading";
import errorHandler from "../../../../helpers/errorHandler";
const UpdateAttendance = () => {
  document.title ="NCPSC || Update Attendance"

  // const [dataStatus, setDataStatus] = useState(false);
  // const [updateData, setUpdateData] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [u_ser, setUser] = useState("");
  let navigate = useNavigate();

  const checkAuth = async () => {
    let b_user = await getUser();
    setUser(b_user);
  };
  if (u_ser && u_ser.role !== "admin") {
    navigate("/");
  }
  useEffect(() => {
    checkAuth();
  }, []);

  // if (dataStatus) {
  //   // var filtered_data = filter(updateData);
  //   setDataStatus(filter(updateData));
  // }
  // function a() {
  //   setTimeout(() => {
  //     setFilterStatus(true);
  //     console.log("done");
  //   }, 2000);
  // }
  const get_attendance = async (e) => {
    try {
      e?.preventDefault();
      setLoading(true);
      const update_date =
        e?.target?.update_date?.value || e?.update_date?.value;
      const update_class =
        e?.target?.update_class?.value || e?.update_class?.value;
      const update_section =
        e?.target?.update_section?.value || e?.update_section?.value;
      const token = localStorage.getItem("token");

      const submit_obj = {
        update_date,
        update_class,
        update_section,
        _token: token,
      };
      const res = await axios.post(
        `${server_url}/api/get_attendance`,
        submit_obj
      );

      if (res.data.success) {
        // setUpdateData(res);
        // setDataStatus(true);
        setFilterStatus(filter(res));
        setLoading(false);
        // console.log(res.data);
      }
    } catch (error) {
      // setDataStatus(false);

      setLoading(false);
      toast.error(error?.response?.data?.message);
      errorHandler(error);
    }
  };

  // console.log(filterStatus);
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
      <h3>Update Attendance</h3>

      <form
        id="update_form"
        onSubmit={get_attendance}
        className={`${style.form_2}`}
      >
        <div className={style.cls_div}>
          <p>Update attendance date</p>
          <input type="date" name="update_date" defaultValue={bdDate().date} />
        </div>
        <div className={style.cls_div}>
          <p>Update Class</p>
          <select
            className={style.input_1}
            name="update_class"
            id="update_class"
          >
            <option value="ten">TEN</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <p>Update Section</p>
          <select
            className={style.input_1}
            name="update_section"
            id="update_section"
          >
            <option value="kadam">KADAM</option>
          </select>
        </div>
        <div className={style.cls_div}>
          <button
            className="btn btn-success shadow-none"
            id="update_submit_btn"
            type="submit"
          >
            View Attendance
          </button>
        </div>
      </form>
      {filterStatus ? <Table props={filterStatus} re={get_attendance} /> : null}
    </>
  );
};

export default UpdateAttendance;
