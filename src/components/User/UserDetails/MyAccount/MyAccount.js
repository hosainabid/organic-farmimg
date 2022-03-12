import React from "react";
import Sidebar from "./SideBar/SideBar";
import { Route, Switch } from "react-router-dom";
import UploadSeed from "./UploadSeed/UploadSeed";

const MyAccount = () => {
  return (
    <div className="row">
      <Sidebar />
      <Switch>
        <Route path="/myAccount/uploadSeed">
          <UploadSeed />
        </Route>
      </Switch>
    </div>
  );
};

export default MyAccount;
