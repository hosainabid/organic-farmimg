import React, { useState } from "react";
import axios from "axios";
const useUserInfo = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("organicFarm-user"))
  );

  const [isCartUpdated, setIsCartUpdated] = useState(false);

  const userLogin = (userLoginEmail, userLoginPassword, history) => {
    const loginDetails = {
      email: userLoginEmail,
      password: userLoginPassword,
    };

    axios
      .post("https://shrouded-basin-02702.herokuapp.com/login", loginDetails)
      .then((res) => {
        if (res.data.isSuccess) {
          setUser(res.data.user_info);
          localStorage.setItem(
            "organicFarm-user",
            JSON.stringify(res.data.user_info)
          );
          history.replace("/myAccount");
        }
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
    isCartUpdated,
    setIsCartUpdated,
  };
};

export default useUserInfo;
