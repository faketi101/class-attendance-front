import axios from "axios";
import { useState } from "react";
import errorHandler from "../../../../helpers/errorHandler";
import { server_url } from "../../../../helpers/auth";
import { ToastContainer, toast } from "react-toastify";

const TH = function (d, i) {
  // console.log("called");
  return (
    <>
      <th key={`__${i}`} scope="col">{`Class_${i + 1}`}</th>
    </>
  );
};

const Table = (props) => {
  const [editTr, setEditTr] = useState(false);
  // console.log(props);
  const Single = (d, i) => {
    const change_attendance = async (e) => {
      try {
        const student = d;
        const st_class_name = e.target.id;
        let st_d_class = "";
        const target = e.target;
        if (target) {
          target.className = "";
          if (target.value === "present") {
            target.className = "text-success";
          } else if (
            target.value === "absent" ||
            target.value === "camera_off"
          ) {
            target.className = "text-danger";
          } else {
            target.className = "text-info";
          }
        }
        const updated_attend = e.target.value;
        const token = localStorage.getItem("token");
        d.attendance.classes.map((da) => {
          if (da.name === st_class_name) {
            st_d_class = da;
          }
          return null;
        });

        const submit_obj = {
          student,
          st_d_class,
          updated_attend,
          update_date: student.attendance.date,
          _token: token,
        };
        console.log(submit_obj);

        const res = await axios.post(
          `${server_url}/api/update_attendance`,
          submit_obj
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Attendance Updated");
        }
        // console.log(res);
      } catch (error) {
        toast.error("Something went wrong. Please try again later");
        errorHandler(error);
      }
    };
    const single_att = (ac, i) => {
      const EditOption = () => {
        return (
          <>
            <select
              id={`${ac.name}`}
              name="attend"
              onChange={change_attendance}
              className=""
            >
              <option value={ac.attend} selected disabled hidden>
                {ac.attend.toUpperCase()}
              </option>
              <option className="text-success" value="present">
                PRESENT
              </option>
              <option className="text-danger" value="absent">
                ABSENT
              </option>
              <option className="text-danger" value="camera_off">
                CAMERA_OFF
              </option>
              <option className="text-warning" value="late">
                LATE
              </option>
              <option className="text-info" value="sick">
                SICK
              </option>
              <option className="text-info" value="leave">
                LEAVE
              </option>
            </select>
          </>
        );
      };

      return (
        <>
          <td className="fs-6" id={`${d.name}`} key={`_${i}`}>
            <p
              className={`badge text-wrap ${
                ac.attend === "present"
                  ? "bg-success"
                  : ac.attend === "absent" || ac.attend === "camera_off"
                  ? "bg-danger"
                  : ac.attend === "sick" || ac.attend === "leave"
                  ? "bg-primary"
                  : "bg-warning"
              }`}
            >
              {editTr ? <EditOption /> : ac.attend.toUpperCase()}
            </p>
          </td>
        </>
      );
    };

    const edit_attendance = (e) => {
      if (editTr) {
        setEditTr(false);
        const update_submit_btn = document?.getElementById("update_submit_btn");
        update_submit_btn.click();
      } else {
        setEditTr(true);
      }
    };

    // console.log("single");
    // console.log(d);
    let total_attend = [];
    d.attendance.classes.map((d) => {
      if (d.attend === "present") {
        total_attend.push(d);
      }
      return null;
    });
    // console.log(total_attend);
    return (
      <>
        <tr key={`___${i}`}>
          <th scope="row">{i + 1}.</th>
          <td>{d.student.name}</td>
          <td>{d.student.school_id}</td>
          {d.attendance.classes.map(single_att)}
          <td className="fs-6">
            <p className={`badge bg-primary`}>{total_attend.length}</p>
          </td>
          <td>
            <button
              className="badge bg-info text-white fw-bold"
              onClick={edit_attendance}
            >
              {editTr ? "Update" : "Edit"}
            </button>
          </td>
        </tr>
      </>
    );
  };

  let data = props?.props;
  // let class_count = data[0].attendance.classes.length;
  // console.log(class_count);

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
      <table className="table table-striped text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">ID</th>
            {data[0]?.attendance.classes.map(TH)}
            <th scope="col">Total Attend</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{data.map(Single)}</tbody>
      </table>
    </>
  );
};

export default Table;
