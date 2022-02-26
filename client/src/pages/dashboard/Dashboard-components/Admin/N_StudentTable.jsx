import { status } from "../../../../helpers/attendanceCounter";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useState } from "react";

const StudentTable = ({ d, inputs, rev }) => {
  const student = d.data;
  const [absentStudent, setAbsentStudent] = useState(false);
  const [sickStudent, setSickStudent] = useState(false);
  const [leaveStudent, setLeaveStudent] = useState(false);
  // console.log(rev);
  let f_presents = [];
  let f_absents = [];
  let f_sicks = [];
  let f_leaves = [];
  const Single = (d, j) => {
    // console.log(d);
    const single_att = (ac, i) => {
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
              {ac.attend.toUpperCase()}
            </p>
          </td>
        </>
      );
    };
    let a_status = status(d);
    let tc = a_status.total_class;
    let tac = a_status.presents.length;
    // console.log(a_status.f_status);
    if (a_status.f_status === "present") {
      f_presents.push(d);
    } else if (a_status.f_status === "absent") {
      f_absents.push(d);
    } else if (a_status.f_status === "sick") {
      f_sicks.push(d);
    } else if (a_status.f_status === "leave") {
      f_leaves.push(d);
    }
    return (
      <>
        <tr key={`___${j}___`}>
          <td>{d.date}</td>
          <td>{d.classes.map(single_att)}</td>
          <td>
            <p
              className={`badge ${
                tc === tac
                  ? "bg-success"
                  : tac === 0
                  ? "bg-danger"
                  : "bg-warning text-danger"
              }`}
            >
              {`${tac} / ${tc}`}
            </p>
          </td>
        </tr>
      </>
    );
  };

  const statusChange = (e) => {
    const btn = e.target.value;
    // console.log(btn);
    if (btn === "absent") {
      if (absentStudent) {
        setAbsentStudent(false);
        setSickStudent(false);
        setLeaveStudent(false);
      } else {
        setAbsentStudent(true);
        setSickStudent(false);
        setLeaveStudent(false);
      }
    } else if (btn === "sick") {
      if (sickStudent) {
        setAbsentStudent(false);
        setSickStudent(false);
        setLeaveStudent(false);
      } else {
        setAbsentStudent(false);
        setSickStudent(true);
        setLeaveStudent(false);
      }
    } else if (btn === "leave") {
      if (leaveStudent) {
        setAbsentStudent(false);
        setSickStudent(false);
        setLeaveStudent(false);
      } else {
        setAbsentStudent(false);
        setSickStudent(false);
        setLeaveStudent(true);
      }
    }
  };

  const ShowFilters = ({ d, header }) => {
    const S = (s, i) => {
      return (
        <>
          <tr>
            <td>{i + 1}</td>
            <td>{s.date}</td>
          </tr>
        </>
      );
    };
    return (
      <>
        <h5>{`${header} for ${inputs.view_id}`}</h5>
        <table className="table table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Absent Date</th>
            </tr>
          </thead>
          <tbody>{d.map(S)}</tbody>
        </table>
      </>
    );
  };

  let main_arr = student.online_attendance;

  let total_index = main_arr.length;

  let reversed = [];
  for (let i = 0; i < total_index; i++) {
    reversed[i] = main_arr[total_index - i - 1];
  }
  // if(reversed.length === main_arr.length){
  //   setReve(reversed)
  // }

  // let rev = student.online_attendance;
  // rev = rev.reverse();
  // console.log(reversed);
  // console.log(rev);

  return (
    <>
      <table id="table_div" className="text-center pt-20">
        <h5 className="fw-bold  badge bg-success text-wrap fs-6">{`Attendance ${
          inputs.view_date ? inputs.view_date : ""
        } of ${inputs.view_id}`}</h5>
        <table className="table table-striped" id="table">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">Dates</th>
              <th scope="col">Classes</th>

              <th scope="col">Total Attend</th>
            </tr>
          </thead>
          <tbody>{rev.map(Single)}</tbody>
        </table>
      </table>

      <div className="btn_div">
        <button
          value="absent"
          onClick={statusChange}
          className={`btn fw-bold shadow-none ${
            !absentStudent
              ? "border-danger text-danger"
              : "btn-danger text-white"
          }`}
        >
          {absentStudent ? `Hide Absent ` : `Show Absent [${f_absents.length}]`}
        </button>

        <button
          value="sick"
          onClick={statusChange}
          className={`btn ${
            !sickStudent
              ? "border-primary text-primary"
              : "btn-primary text-white"
          }  fw-bold shadow-none`}
        >
          {sickStudent ? `Hide Sick  ` : `Show Sick  [${f_sicks.length}]`}
        </button>

        <button
          value="leave"
          onClick={statusChange}
          className={`btn ${
            !leaveStudent ? "border-info text-info" : "btn-info text-white"
          }  fw-bold shadow-none`}
        >
          {leaveStudent ? `Hide Leave ` : `Show Leave [${f_leaves.length}]`}
        </button>
      </div>
      {/* <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className={`btn btn-dark my-2`}
        table="table_div"
        filename={`Attendance ${inputs.view_date ? inputs.view_date : ""} of ${
          inputs.view_id
        }`}
        sheet="tablexls"
        buttonText="Download as XLS"
      /> */}

      {absentStudent && f_absents.length > 0 ? (
        <ShowFilters d={f_absents} header={"ABSENTS"} inputs={inputs} />
      ) : null}

      {sickStudent && f_sicks.length > 0 ? (
        <ShowFilters d={f_sicks} header={"SICK"} inputs={inputs} />
      ) : null}

      {leaveStudent && f_leaves.length > 0 ? (
        <ShowFilters d={f_leaves} header={"LEAVE"} inputs={inputs} />
      ) : null}
    </>
  );
};
export default StudentTable;
