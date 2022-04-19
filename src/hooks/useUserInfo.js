import { useState } from "react";
import axios from "axios";
import rootAPI from "../configurables";
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
      .post(`${rootAPI}/login`, loginDetails)
      .then((res) => {
        if (res.data.isSuccess) {
          setUser(res.data.user_info);
          localStorage.setItem(
            "organicFarm-user",
            JSON.stringify(res.data.user_info)
          );
          history.replace("/myAccount");
        }
      })
      .catch((error) => console.log(error));
  };

  const userLogout = (history) => {
    window.localStorage.removeItem("organicFarm-user");
    setUser(null);
    history.replace("/login");
    localStorage.setItem("organicFood", JSON.stringify([]));
    localStorage.setItem("organicFoodPrebook", JSON.stringify([]));
    localStorage.setItem("organicFoodSeeds", JSON.stringify([]));
    setIsCartUpdated((prev) => !prev);
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
