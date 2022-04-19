import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./User.css";

export default function User() {
  const { user, isCartUpdated } = useAuth();
  const [addedProductCount, setAddedProductCount] = useState(0);
  useEffect(() => {
    let totalItemQuantity = 0;
    let seedJSON = JSON.parse(window.localStorage.getItem("organicFoodSeeds"));
    let prebookJSON = JSON.parse(
      window.localStorage.getItem("organicFoodPrebook")
    );
    let organicFoodJSON = JSON.parse(
      window.localStorage.getItem("organicFood")
    );

    if (seedJSON) {
      seedJSON.map(
        (seed) => (totalItemQuantity = totalItemQuantity + seed.quantity)
      );
      setAddedProductCount(totalItemQuantity);
    }

    if (prebookJSON) {
      prebookJSON.map(
        (crop) => (totalItemQuantity = totalItemQuantity + crop.quantity)
      );
      setAddedProductCount(totalItemQuantity);
    }

    if (organicFoodJSON) {
      organicFoodJSON.map(
        (crop) => (totalItemQuantity = totalItemQuantity + crop.quantity)
      );
      setAddedProductCount(totalItemQuantity);
    }
  }, [isCartUpdated]);

  return (
    <div className="w-100 bg-light">
      <div className="container">
        <div className="d-flex justify-content-end ">
          <ul className="d-flex userinfo-ul align-items-center">
            <li className="list-btn">
              {user ? (
                <Link to="/myAccount">My Account</Link>
              ) : (
                <Link to="/login">LogIn/SignUp</Link>
              )}
            </li>

            <li id="myBag">
              <Link to="/myAccount/myCart">
                <button type="button" className="list-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span className="badge badge-light fw-bolder">
                    {addedProductCount}
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
