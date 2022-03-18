import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./components/pages/About/About";
import Blogs from "./components/pages/Blogs/Blogs";
import Contact from "./components/pages/Contact/Contact";
import Forum from "./components/pages/Forum/Forum";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import OrganicFood from "./components/pages/OrganicFood/OrganicFood";
import SeedBank from "./components/pages/SeedBank/SeedBank";
import Login from "./components/User/Login/Login";
import Registration from "./components/User/Registration/Registration";
import UserDetails from "./components/User/UserDetails/UserDetails";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/seedBank">
              <SeedBank />
            </Route>
            <Route path="/organicFood">
              <OrganicFood />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/myAccount">
              <UserDetails />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
