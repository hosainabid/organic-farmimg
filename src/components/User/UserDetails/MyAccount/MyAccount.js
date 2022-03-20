import React from "react";
import Sidebar from "./SideBar/SideBar";
import { Route, Switch } from "react-router-dom";
import UploadSeed from "./UploadSeed/UploadSeed";
import AllUser from "./AllUser/AllUser";
import CropUpload from "./CropUpload/CropUpload";
import ForumPost from "./ForumPost/ForumPost";
import UpcomingProductUpload from "./UpcomingProductUpload/UpcomingProductUpload";
import PrivateRouteForAdmin from "../../../PrivateRoute/PrivateRouteForAdmin";

const MyAccount = () => {
  return (
    <div className="row">
      <Sidebar />
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
        <Route path="/myAccount/forumPost">
          <ForumPost />
        </Route>
      </Switch>
    </div>
  );
};

export default MyAccount;
