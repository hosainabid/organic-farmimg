import React from "react";
import axios from "axios";
const useUserInfo = () => {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("organicFarm-user"))
  );
  const userLogin = (userLoginEmail, userLoginPassword, history) => {
    const loginDetails = {
      email: userLoginEmail,
      password: userLoginPassword,
    };
    history.replace("/");
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/login", loginDetails)
      .then((res) => {
        setUser(res.data.user_info);
        localStorage.setItem(
          "organicFarm-user",
          JSON.stringify(res.data.user_info)
        );
      });
  };

  const userLogout = (history) => {
    window.localStorage.removeItem("organicFarm-user");
    setUser(null);
    history.replace("/login");
  };

  return {
    userLogin,
    user,
    userLogout,
  };
};

export default useUserInfo;
