import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditOrganisationPage from "./pages/EditOrganisationPage";
import OrganisationListPage from "./pages/OrganisationListPage";
import OpportunityListPage from "./pages/OpportunityListPage";
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/opportunities">
            <OpportunityListPage />
          </Route>
          <Route path="/organisations">
            <OrganisationListPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile">
            <EditOrganisationPage />
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