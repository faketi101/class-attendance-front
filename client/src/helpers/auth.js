import axios from "axios";

export const server_url = "https://ncpscserver.faketi.xyz";

export const isAuth = async () => {
  try {
    const res = await axios.get(`${server_url}/api/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (res.data.auth) {
      return true;
    } else {
      console.log(res);
      return false;
    }
  } catch (error) {
    console.dir(error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${server_url}/api/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (res.data.auth) {
      // console.log(res.data.user_data);

      return res.data.user_data;
    }
  } catch (error) {
    console.dir(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};