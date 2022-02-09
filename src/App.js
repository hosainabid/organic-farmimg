import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import Forum from "./components/pages/Forum/Forum";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import OrganicFood from "./components/pages/OrganicFood/OrganicFood";
import SeedBank from "./components/pages/SeedBank/SeedBank";

function App() {
  return (
    <div className="App">
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
