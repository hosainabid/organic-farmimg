import axios from "axios";
import React, { Fragment } from "react";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";
import rootAPI from "../../../../../configurables";
import { toast, ToastContainer } from "react-toastify";

const AllUser = () => {
  const [isAllUserLoaded, setIsAllUserLoaded] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [allUser, setAllUser] = React.useState([]);
  const loadAllUser = async () => {
    try {
      const data = await axios.get(`${rootAPI}/users`).then((res) => {
        setAllUser(res.data);
        setIsAllUserLoaded(true);
        setFlag(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    !flag && loadAllUser();
  }, [flag]);

  //   make admin function
  const makeAdminHandler = (id, role) => {
    axios
      .post(`${rootAPI}/make_admin`, {
        id: id,
        role,
      })
      .then(function (response) {
        toast.success(`User role updated to ${role}! Reloading...`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => window.location.reload(), 2000);
        console.log(response);
        setFlag(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   make admin function
  const deleteUser = (id) => {
    axios
      .post(`${rootAPI}/delete_user`, {
        id: id,
      })
      .then(function (response) {
        toast.success(`User deleted successfully! Reloading...`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => window.location.reload(), 2000);
        console.log(response);
        setFlag(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let allUserContainer = allUser.map((user, index) => (
    <tr key={user._id}>
      <th scope="row">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.mobile}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <select className="form-select" aria-label="Change Role" onChange={(r) => makeAdminHandler(user._id, r.target.value)}>
          {
            (user.role !== 'admin' && user.role !== 'farmar' && user.role !== 'user')
              ? <option selected>Change Role</option> : <option>Change Role</option>
          }
          {
            user.role === 'admin' ? <option value="admin" selected>Admin</option> : <option value="admin">Admin</option>
          }
          {
            user.role === 'farmar' ? <option value="farmar" selected>Farmer</option> : <option value="farmar">Farmer</option>
          }
          {
            user.role === 'user' ? <option value="user" selected>User</option> : <option value="user">User</option>
          }
        </select>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
          delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h3 className="text-center">All User Details</h3>
      <ToastContainer />

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Make Admin</th>
              <th scope="col">Delete User</th>
            </tr>
          </thead>
          <tbody>{allUserContainer}</tbody>
        </table>
      </div>

      {!isAllUserLoaded && <LoadingSpinner />}
    </Fragment>
  );
};

export default AllUser;
