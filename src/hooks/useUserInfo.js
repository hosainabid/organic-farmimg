import { useState } from "react";
const useUserInfo = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("organicFarm-user"))
  );

  const [isCartUpdated, setIsCartUpdated] = useState(false);

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
    user,
    setUser,
    userLogout,
    isCartUpdated,
    setIsCartUpdated,
  };
};

export default useUserInfo;
