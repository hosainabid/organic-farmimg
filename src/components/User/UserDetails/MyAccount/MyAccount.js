import React from "react";
import Sidebar from "./SideBar/SideBar";
import { Route, Switch } from "react-router-dom";
import UploadSeed from "./UploadSeed/UploadSeed";
import UploadedSeeds from "./UploadedSeeds/UploadedSeeds";
import AllUser from "./AllUser/AllUser";
import CropUpload from "./CropUpload/CropUpload";
import ForumPost from "./ForumPost/ForumPost";

const MyAccount = () => {
  return (
    <div className="row">
      <Sidebar />
      <Switch>
        <Route path="/myAccount/uploadSeed">
          <UploadSeed />
          <hr />
          <UploadedSeeds />
        </Route>
      </Switch>
      <Switch>
        <Route path="/myAccount/allUser">
          <AllUser />
        </Route>
      </Switch>
      <Switch>
        <Route path="/myAccount/cropUpload">
          <CropUpload />
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
