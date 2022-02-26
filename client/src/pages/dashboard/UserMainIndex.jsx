import CreateOnlineAttendance from "./Dashboard-components/Admin/n_create_attendance";
import StudentProfile from "./Dashboard-components/student/N_StudentProfile";

import { getUser } from "../../helpers/auth";
import { useEffect, useState } from "react";

const UserMainIndex = () => {
  const [user, setUser] = useState("");

  const checkAuth = async () => {
    let b_user = await getUser();
    // console.log(b_user);
    setUser(b_user);
  };

 

  useEffect(() => {
    checkAuth();
 
  }, []);
  return (
    <>
      {user && user.role === "admin" ? (
        <CreateOnlineAttendance />
      ) : (
        <StudentProfile user={user} />
      )}
    </>
  );
};

export default UserMainIndex;
