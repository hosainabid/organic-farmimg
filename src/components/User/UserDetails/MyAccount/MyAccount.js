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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrivateRouteForFarmer from "../../../PrivateRoute/PrivateRouteForFarmer";
import Dashboard from "./Dashboard/Dashboard";
import OrderCancelled from "./MyBag/OrderStatus/Cancel/OrderCancelled";
import OrderPending from "./MyBag/OrderStatus/Pending/OrderPending";
import OrderComplete from "./MyBag/OrderStatus/Complete/OrderComplete";
import OrderConfirmed from "./MyBag/OrderStatus/Confirmed/OrderConfirmed";
import OrderShipped from "./MyBag/OrderStatus/Shipped/OrderShipped";
import PreviousForumPost from "./ForumPost/PreviousForumPost";

const MyAccount = () => {
  return (
    <div className="d-md-flex">
      <div className="col-md-4 col-lg-3 col-xl-2 col-sm-12">
        <Sidebar />
      </div>
      <div className="col-md-8 col-lg-9 col-xl-10 col-sm-12 ps-md-5">
        <Switch>
          <Route exact path="/myAccount">
            <Dashboard />
          </Route>
        </Switch>
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
          <PrivateRouteForFarmer path="/myAccount/cropUpload">
            <CropUpload />
          </PrivateRouteForFarmer>
        </Switch>
        <Switch>
          <Route path="/myAccount/upcomingProductUpload">
            <UpcomingProductUpload />
          </Route>
        </Switch>
        <Switch>
          <PrivateRoute>
            <Route exact path="/myAccount/myBag">
              <MyBag />
            </Route>
          </PrivateRoute>
        </Switch>

        {/* forum routes start from here...  */}
        <Switch>
          <Route exact path="/myAccount/forumPost">
            <ForumPost />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/forumPost/previousForumPosts">
            <PreviousForumPost />
          </Route>
        </Switch>
        {/* forum routes ends here ... */}

        <Switch>
          <Route path="/myAccount/myBag/pending">
            <OrderPending />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/myBag/confirmed">
            <OrderConfirmed />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/myBag/shipped">
            <OrderShipped />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/myBag/complete">
            <OrderComplete />
          </Route>
        </Switch>
        <Switch>
          <Route path="/myAccount/myBag/cancelled">
            <OrderCancelled />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default MyAccount;
