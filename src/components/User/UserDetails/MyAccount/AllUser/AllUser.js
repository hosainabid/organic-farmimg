import axios from "axios";
import React, { Fragment } from "react";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

const AllUser = () => {
  const [isAllUserLoaded, setIsAllUserLoaded] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [allUser, setAllUser] = React.useState([]);
  const loadAllUser = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/users")
        .then((res) => {
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
  const makeAdminHandler = (id) => {
    axios
      .post("https://shrouded-basin-02702.herokuapp.com/make_admin", {
        id: id,
        role: "admin",
      })
      .then(function (response) {
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
        {!(user.role === "admin") && (
          <button
            onClick={() => makeAdminHandler(user._id)}
            className="list-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-check-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            Make Admin
          </button>
        )}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h3 className="text-center">All User Details</h3>

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
