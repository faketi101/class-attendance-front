import { counter } from "../../../../helpers/attendanceCounter";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const S_ViewTable = (p) => {
  const data = p.data;
  const inputs = p.inputs;
  // console.log(data);
  const SingleTr = (d, i) => {
    const count = counter(d);
    if (!count) return;
    return (
      <>
        <tr key={`__${i + 1}_`}>
          <td>{i + 1}.</td>
          <td>{d.student.name}</td>
          <td>{d.student.school_id}</td>
          <td>{d.student.class.toUpperCase()}</td>
          <td>{d.student.section.toUpperCase()}</td>
          <td className="fw-bold text-info">{count.class_count}</td>
          <td className="fw-bold text-success">{count.presents.length}</td>
          <td className="fw-bold text-danger">{count.absents.length}</td>
          <td>{count.leaves.length}</td>
          <td>{count.sicks.length}</td>
          <td className="fw-bold">
            <p
              className={`badge ${
                count.present_percent >= 80
                  ? "bg-success"
                  : count.present_percent < 80 && count.present_percent >= 60
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >{`${count.present_percent.toFixed(2)}%`}</p>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className={`btn btn-dark my-2`}
        table="table_div"
        filename={`Attendance:_${inputs.from_date}_to_${inputs.to_date}_for_${
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
        <h3 className="fw-bold  badge bg-success text-wrap fs-6">
          {`Attendance: ${inputs.from_date}_to_${inputs.to_date}_for_${
            !inputs.view_id
              ? `_Class_${inputs.view_class.toUpperCase()}${
                  inputs.view_section
                    ? `_Section_${inputs.view_section.toUpperCase()}`
                    : ""
                }`
              : inputs.view_id
          }`}
        </h3>
        <table class="table table-striped text-center" id="table">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Class</th>
              <th scope="col">Section</th>
              <th scope="col">Total Class</th>
              <th scope="col">Total Present</th>
              <th scope="col">Total Absents</th>
              <th scope="col">Total Leave</th>
              <th scope="col">Total Sick</th>
              <th scope="col">Present Percentage</th>
            </tr>
          </thead>
          <tbody>{data.map(SingleTr)}</tbody>
        </table>
      </table>
    </>
  );
};

export default S_ViewTable;
