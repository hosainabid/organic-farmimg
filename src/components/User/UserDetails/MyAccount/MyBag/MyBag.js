import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useAuth from "../../../../../hooks/useAuth";
import OrganicFoodBag from "./OrganicFoodBag";
import PreOrder from "./PreOrder";
import SeedBag from "./SeedBag";

export default function MyBag() {
  const [subTotal, setSubtotal] = useState(0);
  const [seeds, setSeeds] = useState([]);
  const [prebook, setPrebook] = useState([]);
  const [crops, setCrops] = useState([]);
  const { isCartUpdated } = useAuth();
  const [quickDelivary, setQuickDelivary] = useState();

  const settingSubtotal = () => {
    let seedsPrice = 0;
    if (seeds.length > 0) {
      seeds.map((item) => {
        seedsPrice = seedsPrice + parseInt(item.seed.price) * item.quantity;
      });
    }
    let prebookPrice = 0;
    if (prebook.length > 0) {
      prebook.map((item) => {
        prebookPrice =
          prebookPrice + parseInt(item.cropDetails.price) * item.quantity;
      });
    }
    let cropsPrice = 0;
    if (crops.length > 0) {
      crops.map((item) => {
        cropsPrice =
          cropsPrice + parseInt(item.cropDetails.price) * item.quantity;
      });
    }

    setSubtotal(seedsPrice + prebookPrice + cropsPrice);
  };

  useEffect(() => {
    setSeeds(JSON.parse(localStorage.getItem("organicFoodSeeds")));
    setPrebook(JSON.parse(localStorage.getItem("organicFoodPrebook")));
    setCrops(JSON.parse(localStorage.getItem("organicFood")));
  }, [isCartUpdated]);

  useEffect(() => {
    settingSubtotal();
  }, [seeds, prebook, crops]);
  return (
    <div className="my-4">
      <h3 className="text-center">My Orders</h3>
      <div className="row">
        <div className="col-lg-8">
          <SeedBag />
          <PreOrder />
          <OrganicFoodBag />
        </div>
        <div className="col-lg-4">
          <div className="my-4 p-lg-5 p-md-0">
            <h4 className="text-center mb-4">Purches Summery</h4>
            <div className="table-responsive">
              <table className="table table-borderless order-summery-table">
                <tbody>
                  <tr>
                    <td>Sub-Total</td>
                    <td>{subTotal}/tk</td>
                  </tr>
                  {Boolean(seeds.length) && (
                    <tr>
                      <td>Seeds/Fertilizers</td>
                      <td>{seeds.length} item(s)</td>
                    </tr>
                  )}
                  {Boolean(crops.length) && (
                    <tr>
                      <td>Organic Foods</td>
                      <td>{crops.length} item(s)</td>
                    </tr>
                  )}
                  {Boolean(prebook.length) && (
                    <tr>
                      <td>Pre-Order Items</td>
                      <td>{prebook.length} item(s)</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="quickShip"
                onChange={(e) => setQuickDelivary(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="quickShip">
                Get Delivary within minimal time.
              </label>
            </div>
            <p className="text-center my-4 h5">
              Total: {Boolean(quickDelivary) ? subTotal + 100 : subTotal}/tk
            </p>

            {/* <div className="paymet-area text-center">
              <StripeCheckout stripeKey="pk_test_51Kp4FSIl8Xfw3K0TXt9M2yIikCsZyc6rcQ2QgVYhb9v2tVurMV7Ok4fUDMnlEIJqkrvKUnkH5ObEhADjhR5CmdZK0020fXqYx1" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
