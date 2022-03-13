import React, { useState } from "react";
import axios from "axios";

const UploadSeed = () => {
  const [seedName, setSeedName] = useState("");
  const [seedCategory, setSeedCategory] = useState("");
  const [seedQuantity, setSeedQuantity] = useState("");
  const [seedStock, setSeedStock] = useState(0);
  const [seedImage, setSeedImage] = useState();

  const uploadSeedHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", seedName);
    formData.append("category", seedCategory);
    formData.append("quantity", seedQuantity);
    formData.append("stock", seedStock);
    formData.append("file", seedImage);

    axios
      .post("https://shrouded-basin-02702.herokuapp.com/add_new_seed", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-5">
      <h3 className="text-center my-4">Upload A New Seed</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={uploadSeedHandler}>
            <div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={seedName}
                  placeholder="Seed Name..."
                  onChange={(e) => {
                    setSeedName(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  type="text"
                  className="form-control"
                  value={seedCategory}
                  placeholder="Seed Category..."
                  onChange={(e) => {
                    setSeedCategory(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  type="text"
                  className="form-control"
                  value={seedQuantity}
                  placeholder="Seed Quantity..."
                  onChange={(e) => {
                    setSeedQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="seedStock">Seed Stock</label>
                <input
                  type="number"
                  id="seedStock"
                  className="form-control"
                  value={seedStock}
                  min={0}
                  placeholder="Seed Quality..."
                  onChange={(e) => {
                    setSeedStock(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(e) => setSeedImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-group mt-4">
              <button type="submit" className="list-btn px-4 py-2 text-white">
                Upload Seed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSeed;
