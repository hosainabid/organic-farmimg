import React from "react";
import Sidebar from "./SideBar/SideBar";
import { Route, Switch } from "react-router-dom";
import UploadSeed from "./UploadSeed/UploadSeed";
import AllUser from "./AllUser/AllUser";
import CropUpload from "./CropUpload/CropUpload";
import ForumPost from "./ForumPost/ForumPost";
import UpcomingProductUpload from "./UpcomingProductUpload/UpcomingProductUpload";
import PrivateRouteForAdmin from "../../../PrivateRoute/PrivateRouteForAdmin";
import MyBag from "./MyBag/MyBag";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute";

const MyAccount = () => {
  return (
    <div className="d-md-flex">
      <div className="col-md-3 col-sm-12">
        <Sidebar />
      </div>
      <div className="col-md-9 col-sm-12 ps-md-5">
        <Switch>
          <PrivateRouteForAdmin path="/myAccount/uploadSeed">
            <UploadSeed />
          </PrivateRouteForAdmin>
        </Switch>
        <Switch>
          <PrivateRouteForAdmin path="/myAccount/allUser">
            <AllUser />
          </PrivateRouteForAdmin>
        </Switch>
        <Switch>
          <Route path="/myAccount/cropUpload">
            <CropUpload />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/upcomingProductUpload">
            <UpcomingProductUpload />
          </Route>
        </Switch>
        <Switch>
          <PrivateRoute>
            <Route path="/myAccount/myBag">
              <MyBag />
            </Route>
          </PrivateRoute>
        </Switch>
        <Switch>
          <Route path="/myAccount/forumPost">
            <ForumPost />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default MyAccount;
