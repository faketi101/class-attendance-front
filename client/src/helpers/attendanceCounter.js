exports.status = (d) => {
  //   console.log(d);
  let presents = [];
  let absents = [];
  let sicks = [];
  let leaves = [];
  d.classes.map((cls) => {
    if (cls.attend === "present" || cls.attend === "late") {
      presents.push(cls);
    }
    if (cls.attend === "absent" || cls.attend === "camera_off") {
      absents.push(cls);
    }
    if (cls.attend === "sick") {
      sicks.push(cls);
    }
    if (cls.attend === "leave") {
      leaves.push(cls);
    }
    return null;
  });
  if (
    presents.length + absents.length + sicks.length + leaves.length ===
    d.classes.length
  ) {
    let total_class =
      presents.length + absents.length + sicks.length + leaves.length;

    let f_status = "present";
    if (presents.length === total_class) {
      f_status = "present";
    }
    if (sicks.length > 1) {
      f_status = "sick";
    }
    if (leaves.length > 1) {
      f_status = "leave";
    }
    if (absents.length > 0) {
      f_status = "absent";
    }

    let obj = {
      f_status,
      total_class,
      presents,
      absents,
      sicks,
      leaves,
    };
    return obj;
  }
};
exports.counter = (d) => {
  // console.log(d);
  // console.log(Array.isArray(d.online_attendance));
  const isArray = Array.isArray(d.online_attendance);
  let status;
  if (isArray) {
    status = d.online_attendance.map(this.status);
  } else {
    status = this.status(d.online_attendance);
  }
  let class_count = status.length || 1;
  //   console.log(status);
  let presents = [];
  let absents = [];
  let sicks = [];
  let leaves = [];
  if (Array.isArray(status)) {
    // console.log(status);
    status.map((cls) => {
      if (!cls) {
        return console.log(d);
      }
      if (cls.f_status && cls.f_status === "present") {
        presents.push(cls);
      }
      if (
        cls.f_status &&
        (cls.f_status === "absent" || cls.attend === "camera_off")
      ) {
        absents.push(cls);
      }
      if (cls.f_status && cls.f_status === "sick") {
        sicks.push(cls);
      }
      if (cls.f_status && cls.f_status === "leave") {
        leaves.push(cls);
      }
      return null;
    });
  } else {
    let cls = status;
    if (cls.f_status === "present") {
      presents.push(cls);
    }
    if (cls.f_status === "absent" || cls.attend === "camera_off") {
      absents.push(cls);
    }
    if (cls.f_status === "sick") {
      sicks.push(cls);
    }
    if (cls.f_status === "leave") {
      leaves.push(cls);
    }
  }
  if (
    presents.length + absents.length + sicks.length + leaves.length ===
    class_count
  ) {
    let present_percent = (presents.length * 100) / class_count;
    let obj = {
      present_percent,
      class_count,
      presents,
      absents,
      sicks,
      leaves,
    };
    // console.log(class_count);
    // console.log(obj);
    return obj;
  }
};

exports.filter = (updateData) => {
  let _data = updateData.data;
  let update_date = updateData?.data?.update_date;

  // console.log(update_date);
  let filtered_data = [];

  let s_data = _data.data;
  // console.log(s_data);
  s_data.map((d) => {
    d.online_attendance.map((a) => {
      if (a.date === update_date) {
        let obj = {
          student: d,
          attendance: a,
        };
        filtered_data.push(obj);
        // console.log(filtered_data);
      }
      return null;
    });
    return null;
  });
  // console.log(s_data.length);
  // console.log(filtered_data.length);
  if (filtered_data.length === s_data.length) {
    // console.log(filtered_data);
    return filtered_data;
  }
};


exports.bdDate = () => {
  var d = new Date();
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = new Date(utc + 3600000 * 6);

  let month = "";
  let day = "";
  if (nd.getMonth() < 10) {
    month = `0${nd.getMonth() + 1}`;
  } else {
    month = nd.getMonth() + 1;
  }

  if (nd.getDate() < 10) {
    day = `0${nd.getDate()}`;
  } else {
    day = nd.getDate();
  }
  let obj = {
    date: `${nd.getFullYear()}-${month}-${day}`,
    all: nd,
  };

  return obj;
};