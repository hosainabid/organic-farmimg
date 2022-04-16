import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

export default function OrganicFoodItem({ crop }) {
  const { setIsCartUpdated } = useAuth();
  const [addCounter, setAddCounter] = useState(0);

  useEffect(() => {
    let cropJSON = JSON.parse(window.localStorage.getItem("organicFood"));
    if (cropJSON.length > 0) {
      cropJSON.map((item) => {
        if (item.cropDetails._id === crop._id) {
          setAddCounter(item.quantity);
        }
      });
    }
  }, []);
  const addToOrganicFoodCartHandler = (selectedCrop) => {
    let cropJSON = JSON.parse(window.localStorage.getItem("organicFood"));

    if (cropJSON.length === 0) {
      localStorage.setItem(
        "organicFood",
        JSON.stringify([{ cropDetails: { ...selectedCrop }, quantity: 1 }])
      );
      setAddCounter(1);
    } else {
      const isCropAlreadyExist = cropJSON.find(
        (prev) => prev.cropDetails._id === selectedCrop._id
      );

      if (isCropAlreadyExist) {
        cropJSON.find((prev) => {
          if (prev.cropDetails._id === selectedCrop._id) {
            prev.quantity = prev.quantity + 1;
            setAddCounter(prev.quantity);
          }
          localStorage.setItem("organicFood", JSON.stringify([...cropJSON]));
        });
      } else {
        localStorage.setItem(
          "organicFood",
          JSON.stringify([
            ...cropJSON,
            { cropDetails: { ...selectedCrop }, quantity: 1 },
          ])
        );
        setAddCounter(1);
      }
    }
    setIsCartUpdated((prev) => !prev);
  };

  const subtractFromOrganicFoodCartHandler = (id) => {
    let cropJSON = JSON.parse(window.localStorage.getItem("organicFood"));
    cropJSON.map((prev, index) => {
      if (prev.cropDetails._id === id) {
        prev.quantity = prev.quantity - 1;
        if (prev.quantity > 0) {
          localStorage.setItem("organicFood", JSON.stringify([...cropJSON]));
        } else {
          cropJSON.splice(index, 1);
          localStorage.setItem("organicFood", JSON.stringify([...cropJSON]));
        }
        setAddCounter(prev.quantity);
      }
    });
    setIsCartUpdated((prev) => !prev);
  };

  return (
    <div className="card h-100 shadow p-1">
      <img
        className="card-img-top"
        src={`data:image/png;base64,${crop.image.img}`}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{crop.name}</h5>
        <div className="card-text">
          <p className="py-1">
            Quantity: <span className="fw-bold">{crop.quantity}</span>
          </p>

          <p className="py-1">
            Stock: <span className="fw-bold">{crop.stock} </span>
            Unit
          </p>
          <p className="py-1">
            Farmer Name:{" "}
            <span className="fw-bold text-info text-capitalize">
              {crop.farmerName}
            </span>
          </p>
          <p className="py-1">
            Price: <span className="fw-bold">{crop.price} </span>
            Tk
          </p>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-center">
          {addCounter ? (
            <div className="btn-group w-100" role="group">
              <button
                onClick={() => {
                  subtractFromOrganicFoodCartHandler(crop._id);
                }}
                type="button"
                className="btn subtract-btn"
              >
                -
              </button>
              <button type="button" className="btn px-3" disabled>
                {addCounter}
              </button>
              <button
                onClick={() => addToOrganicFoodCartHandler(crop)}
                type="button"
                className="btn add-btn"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addToOrganicFoodCartHandler(crop);
              }}
              type="button"
              className="list-btn px-3 py-2 w-100"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
