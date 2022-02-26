import { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { status } from "../../../../helpers/attendanceCounter";

const TH = function (d, i) {
  // console.log("called");
  return (
    <>
      <th key={`__${i}`} scope="col">{`Class_${i + 1}`}</th>
    </>
  );
};
const ViewTableSection = (props) => {
  const [absentStudents, setAbsentStudents] = useState(false);
  // console.log(props);

  const statusChange = () => {
    if (absentStudents) {
      setAbsentStudents(false);
    } else {
      setAbsentStudents(true);
    }
  };

  let data = props?.props;

  let tc = data[0]?.attendance.classes.length;
  let f_absents = [];
  const inputs = props.inputs;
  const Single = (d, i) => {
    // console.log(d);
    let attn_status = status(d.attendance);
    if (attn_status.f_status === "absent") {
      f_absents.push(d.student);
    }
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
    let tac = total_attend.length;
    return (
      <>
        <tr key={`___${i}`}>
          <th scope="row">{i + 1}.</th>
          <td>{d.student.name}</td>
          <td>{d.student.school_id}</td>
          <td>{d.student.class.toUpperCase()}</td>
          <td>{d.student.section.toUpperCase()}</td>
          {d.attendance.classes.map(single_att)}
          <td className="fs-6">
            <p
              className={`badge ${
                tc === tac
                  ? "bg-success"
                  : tac === 0
                  ? "bg-danger"
                  : "bg-warning text-danger"
              }`}
            >
              {tac}
            </p>
          </td>
        </tr>
      </>
    );
  };

  const ShowFilters = ({ d, header }) => {
    const S = (s, i) => {
      return (
        <>
          <tr>
            <td>{i + 1}.</td>
            <td>{s.name}</td>
            <td>{`NCPSC${s.school_id}`}</td>
          </tr>
        </>
      );
    };
    return (
      <>
        <h5>{`${header} for ${inputs.view_date.toUpperCase()} ${inputs.view_class.toUpperCase()} ${inputs.view_section.toUpperCase()}`}</h5>
        <table className="table table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{d.map(S)}</tbody>
        </table>
      </>
    );
  };
  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className={`btn btn-dark my-2`}
        table="table_div"
        filename={`Attendance:_${!inputs.view_id ? inputs.view_date : ""}for_${
          !inputs.view_id
            ? `__class_${inputs.view_class}${
                inputs.view_section ? `__section_${inputs.view_section}` : ""
              }`
            : inputs.view_id
        }`}
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <table id="table_div" className="text-center">
        <h5 className="fw-bold  badge bg-success text-wrap fs-6">
          {`Attendance: ${!inputs.view_id ? inputs.view_date : ""} for ${
            !inputs.view_id
              ? ` Class: ${inputs.view_class.toUpperCase()}, ${
                  inputs.view_section
                    ? ` Section: ${inputs.view_section.toUpperCase()}`
                    : ""
                }`
              : inputs.view_id
          }`}
        </h5>
        <table className="table table-striped text-center" id="table">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Class</th>
              <th scope="col">Section</th>
              {data[0]?.attendance.classes.map(TH)}
              <th scope="col">Total Attend</th>
            </tr>
          </thead>
          <tbody>{data.map(Single)}</tbody>
        </table>
      </table>
      <button
        onClick={statusChange}
        className={`btn btn-primary text-white fw-bold shadow-none`}
      >
        {absentStudents
          ? `Hide Absent Students `
          : `Show Absent Students [${f_absents.length}]`}
      </button>
      {absentStudents ? (
        <ShowFilters d={f_absents} header={"ABSENTS"} inputs={inputs} />
      ) : null}
    </>
  );
};

export default ViewTableSection;
