import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../helpers/auth";

const LogOut = () => {
  useEffect(() => {
    logout();
  }, []);


 
  return <Navigate to="/" />;
};

export default LogOut;
