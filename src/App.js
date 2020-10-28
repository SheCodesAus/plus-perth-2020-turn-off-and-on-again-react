import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import OrganisationListPage from "./pages/OrganisationListPage";
import ListingListPage from "./pages/ListingListPage";

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/opportunities">
            <ListingListPage />
          </Route>
          <Route path="/organisations">
            <OrganisationListPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;