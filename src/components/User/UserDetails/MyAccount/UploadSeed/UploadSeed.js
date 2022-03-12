import React, { useState } from "react";
import axios from "axios";

const UploadSeed = () => {
  const [seedName, setSeedName] = useState("");
  const [seedCategory, setSeedCategory] = useState("");
  const [seedQuality, setSeedQuality] = useState("");
  const [seedStock, setSeedStock] = useState(0);
  const [seedImage, setSeedImage] = useState();

  const uploadSeedHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", seedName);
    formData.append("category", seedCategory);
    formData.append("quantity", seedQuality);
    formData.append("stock", seedStock);
    formData.append("file", seedImage);

    // fetch("https://shrouded-basin-02702.herokuapp.com/add_new_seed", {
    //   method: "POST",
    //   body: formData,
    // });
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
    <div>
      <h3 className="text-center my-4">Upload A New Seed</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={uploadSeedHandler}>
            <div>
              <div class="form-group mt-4">
                <input
                  type="text"
                  class="form-control"
                  value={seedName}
                  placeholder="Seed Name..."
                  onChange={(e) => {
                    setSeedName(e.target.value);
                  }}
                />
              </div>

              <div class="form-group mt-4">
                <input
                  type="text"
                  class="form-control"
                  value={seedCategory}
                  placeholder="Seed Category..."
                  onChange={(e) => {
                    setSeedCategory(e.target.value);
                  }}
                />
              </div>

              <div class="form-group mt-4">
                <input
                  type="text"
                  class="form-control"
                  value={seedQuality}
                  placeholder="Seed Quality..."
                  onChange={(e) => {
                    setSeedQuality(e.target.value);
                  }}
                />
              </div>

              <div class="form-group mt-4">
                <label for="seedStock">Seed Stock</label>
                <input
                  type="number"
                  id="seedStock"
                  class="form-control"
                  value={seedStock}
                  min={0}
                  placeholder="Seed Quality..."
                  onChange={(e) => {
                    setSeedStock(e.target.value);
                  }}
                />
              </div>

              <div class="form-group mt-4">
                <input
                  type="file"
                  class="form-control-file"
                  onChange={(e) => setSeedImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-group mt-4">
              <button type="submit" class="list-btn px-4 py-2 text-white">
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
