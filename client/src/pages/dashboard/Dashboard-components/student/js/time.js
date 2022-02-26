
export default function f_time() {
    let date = new Date();
  
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    let month = months[date.getMonth()];
    let dateint = date.getDate();
    let year = date.getFullYear();
    let Calender = `${dateint} ${month}, ${year}`;
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let Day = days[date.getDay()];
  
    let hour = date.getHours();
    let minute = date.getMinutes();
    const Clock = `${hour} : ${minute}`;
  
    const Time = {
      Calender: Calender,
      Day: Day,
      Clock: Clock,
    };
    setTimeout(f_time, 1000);
  return Time

  }
  
  
  