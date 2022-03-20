import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

const UploadSeed = () => {
  const [seedName, setSeedName] = useState("");
  const [seedCategory, setSeedCategory] = useState("");
  const [seedQuantity, setSeedQuantity] = useState("");
  const [seedStock, setSeedStock] = useState(0);
  const [seedImage, setSeedImage] = useState();

  const [isSeedLoaded, setIsSeedLoaded] = React.useState(false);
  const [allSeed, setAllSeed] = React.useState([]);
  const [flag, setFlag] = useState(true);

  const [updatedCropName, setUpdatedCropName] = useState("");
  const [updatedCropCategory, setUpdatedCropCategory] = useState("");
  const [updatedCropQuantity, setUpdatedCropQuantity] = useState("");
  const [updatedCropStock, setUpdatedCropStock] = useState(0);

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
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadAllSeed = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_seeds")
        .then((res) => {
          setAllSeed(res.data);
          setIsSeedLoaded(true);
          setFlag((prevState) => !prevState);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const seedDeleteHandler = (id) => {
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/delete_seed", {
        id: id,
      })
      .then(function (response) {
        console.log(response);
        setFlag((prevState) => !prevState);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateCrop = (
    id,
    updatedCropName,
    updatedCropCategory,
    updatedCropQuantity,
    updatedCropStock,
    prevName,
    prevCategory,
    prevQuantity,
    prevStock
  ) => {
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/update_seed_info", {
        id: id,
        name: updatedCropName || prevName,
        category: updatedCropCategory || prevCategory,
        quantity: updatedCropQuantity || prevQuantity,
        stock: updatedCropStock || prevStock,
      })
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
        setFlag((prevState) => !prevState);
      });
  };

  React.useEffect(() => {
    loadAllSeed();
  }, [flag]);

  return (
    <div className="my-5">
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
                  required
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
                  required
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
                  required
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
                  required
                  type="file"
                  className="form-control"
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

      <hr />

      <div className="my-4">
        <h3 className="text-center">All Uploaded Seeds</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Stock</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody>
              {allSeed.map((tr, index) => (
                <tr key={tr._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={tr.name}
                      onChange={(e) => setUpdatedCropName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={tr.category}
                      onChange={(e) => setUpdatedCropCategory(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={tr.quantity}
                      onChange={(e) => setUpdatedCropQuantity(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      defaultValue={tr.stock}
                      onChange={(e) => setUpdatedCropStock(e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        updateCrop(
                          tr._id,
                          updatedCropName,
                          updatedCropCategory,
                          updatedCropQuantity,
                          updatedCropStock,
                          tr.name,
                          tr.category,
                          tr.quantity,
                          tr.stock
                        )
                      }
                      type="button"
                      className="list-btn px-3 py-1"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => seedDeleteHandler(tr._id)}
                      className="list-btn px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {!isSeedLoaded && <LoadingSpinner />}
    </div>
  );
};

export default UploadSeed;
