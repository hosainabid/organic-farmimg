import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";

export default function OrganicFoodBag() {
  const [organicFoodItems, setOrganicFoodItems] = useState(
    JSON.parse(localStorage.getItem("organicFood"))
  );
  const { user, isCartUpdated, setIsCartUpdated } = useAuth();

  useEffect(() => {
    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
  }, [isCartUpdated]);

  const deleteFromPrebookItems = (index) => {
    const prevOrganicFoodItems = JSON.parse(
      localStorage.getItem("organicFood")
    );

    prevOrganicFoodItems.splice(index, 1);
    localStorage.setItem(
      "organicFood",
      JSON.stringify([...prevOrganicFoodItems])
    );
    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
    setIsCartUpdated((prevState) => !prevState);
  };

  const updatePrebookItem = (index, value) => {
    const prevOrganicFoodItems = JSON.parse(
      localStorage.getItem("organicFood")
    );
    prevOrganicFoodItems[index].quantity = parseInt(value);
    localStorage.setItem(
      "organicFood",
      JSON.stringify([...prevOrganicFoodItems])
    );

    setOrganicFoodItems(JSON.parse(localStorage.getItem("organicFood")));
    setIsCartUpdated((prevState) => !prevState);
  };

  return (
    <Fragment>
      {Boolean(organicFoodItems.length) && (
        <div className="rounded border p-3 my-5">
          <h4 className="fw-light mt-3">Added Organic Foods in cart</h4>

          <div className="table-responsive">
            <table className="mt-3 table table-borderless">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price(unit)</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>

              <tbody>
                {organicFoodItems.map((product, index) => {
                  return (
                    <tr key={product.cropDetails._id}>
                      <td className="d-flex justify-content-center">
                        <button
                          onClick={() => deleteFromPrebookItems(index)}
                          className="border rounded cart-product-delete-btn p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-trash-fill "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="cart-product-img mx-3">
                            <img
                              className="img-fluid rounded"
                              src={`data:image/png;base64,${product.cropDetails.image.img}`}
                              alt={product.cropDetails.name}
                            />
                          </div>
                          <div className="cart-product-name text-capitalize mx-3 fw-bold">
                            {product.cropDetails.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold h5">
                          {product.cropDetails.price}
                        </span>{" "}
                        {" Tk"}
                      </td>
                      <td className="fw-bold">
                        <input
                          className="form-control cart-product-quantity-field"
                          type="number"
                          defaultValue={product.quantity}
                          min={1}
                          onChange={(e) =>
                            updatePrebookItem(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <span className="h5">
                          {product.cropDetails.price * product.quantity}
                        </span>
                        {" Tk"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
}
