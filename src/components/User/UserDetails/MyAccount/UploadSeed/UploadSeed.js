import React, { useState, Fragment } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

const UploadSeed = () => {
  const [seedName, setSeedName] = useState("");
  const [seedCategory, setSeedCategory] = useState("");
  const [seedQuantity, setSeedQuantity] = useState("");
  const [seedPrice, setSeedPrice] = useState(0);
  const [seedStock, setSeedStock] = useState(0);
  const [seedImage, setSeedImage] = useState();

  const [isSeedLoaded, setIsSeedLoaded] = React.useState(false);
  const [allSeed, setAllSeed] = React.useState([]);
  const [flag, setFlag] = useState(true);

  const [updatedCropName, setUpdatedCropName] = useState("");
  const [updatedCropCategory, setUpdatedCropCategory] = useState("");
  const [updatedCropQuantity, setUpdatedCropQuantity] = useState("");
  const [updatedCropPrice, setUpdatedCropPrice] = useState(0);
  const [updatedCropStock, setUpdatedCropStock] = useState(0);

  const uploadSeedHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", seedName);
    formData.append("category", seedCategory);
    formData.append("quantity", seedQuantity);
    formData.append("price", seedPrice);
    formData.append("stock", seedStock);
    formData.append("file", seedImage);

    console.log(seedPrice);

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
          console.log(res.data);
          setIsSeedLoaded(true);
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
    updatedCropPrice,
    updatedCropStock,
    prevName,
    prevCategory,
    prevQuantity,
    prevPrice,
    prevStock
  ) => {
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/update_seed_info", {
        id: id,
        name: updatedCropName || prevName,
        category: updatedCropCategory || prevCategory,
        quantity: updatedCropQuantity || prevQuantity,
        price: updatedCropPrice || prevPrice,
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
    <Fragment>
      <h3 className="text-center my-4">Upload A New Seed</h3>
      <div className="row justify-content-center">
        <div className="col-lg-10">
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
                <label htmlFor="seedStock">Seed Price</label>
                <input
                  required
                  type="number"
                  id="seedPrice"
                  className="form-control"
                  value={seedPrice}
                  min={1}
                  placeholder="Seed Price..."
                  onChange={(e) => {
                    setSeedPrice(e.target.value);
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
                <th scope="col">Price</th>
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
                      defaultValue={tr.price}
                      onChange={(e) => setUpdatedCropPrice(e.target.value)}
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
                          updatedCropPrice,
                          updatedCropStock,
                          tr.name,
                          tr.category,
                          tr.quantity,
                          tr.price,
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
    </Fragment>
  );
};

export default UploadSeed;
