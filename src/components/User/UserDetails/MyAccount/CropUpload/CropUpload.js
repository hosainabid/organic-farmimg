import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";

export default function CropUpload() {
  const [cropName, setCropName] = useState("");
  const [cropCategory, setCropCategory] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [cropStock, setCropStock] = useState(0);
  const [cropImage, setCropImage] = useState();
  const [allCrop, setAllCrop] = useState([]);
  const [flag, setFlag] = useState(false);

  const { user } = useAuth();

  const uploadCropHandler = (event) => {
    event.preventDefault();
    const d = new Date();
    const postTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;

    const formData = new FormData();
    formData.append("name", cropName);
    formData.append("category", cropCategory);
    formData.append("quantity", cropQuantity);
    formData.append("stock", cropStock);
    formData.append("file", cropImage);
    formData.append("farmerId", user._id);
    formData.append("farmerName", user.name);
    formData.append("postTime", postTime);

    axios
      .post("https://shrouded-basin-02702.herokuapp.com/add_new_crop", formData)
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });

    setCropName("");
    setCropCategory("");
    setCropQuantity("");
    setCropStock(0);
    setCropImage();
  };

  const loadMyCrops = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_crops")
        .then((res) => {
          setAllCrop(res.data.reverse());
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => loadMyCrops(), [flag]);

  const deleteMyCrop = (id) => {
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/delete_crop", {
        id: id,
      })
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-4">
      <h3 className="text-center mb-4">Upload A New Crop</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={uploadCropHandler}>
            <div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropName}
                  placeholder="Crop Name..."
                  onChange={(e) => {
                    setCropName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropCategory}
                  placeholder="Crop Category..."
                  onChange={(e) => {
                    setCropCategory(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropQuantity}
                  placeholder="Crop Quantity..."
                  onChange={(e) => {
                    setCropQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="cropStock">Crop Stock</label>
                <input
                  required
                  type="number"
                  id="cropStock"
                  className="form-control"
                  value={cropStock}
                  min={0}
                  placeholder="Crop Quality..."
                  onChange={(e) => {
                    setCropStock(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  required
                  type="file"
                  className="form-control"
                  onChange={(e) => setCropImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-group mt-4">
              <button type="submit" className="list-btn px-4 py-2 text-white">
                Upload Crop
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <h3 className="text-center my-4">My Uploaded Crops</h3>
      <table className="table  table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Stock</th>
            <th scope="col">Post Time</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {allCrop.map((myCrop, index) => {
            if (user._id === myCrop.farmerId) {
              return (
                <tr key={myCrop._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{myCrop.name}</td>
                  <td>{myCrop.category}</td>
                  <td>{myCrop.quantity}</td>
                  <td>{myCrop.stock}</td>
                  <td>{myCrop.postTime}</td>
                  <td>
                    <button className="list-btn px-3 py-1">Update</button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteMyCrop(myCrop._id)}
                      className="list-btn px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
