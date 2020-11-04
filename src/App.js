import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditOrganisationPage from "./pages/EditOrganisationPage";
import NewOrganisationPage from "./pages/NewOrganisationPage";
import OrganisationListPage from "./pages/OrganisationListPage";
import OpportunityListPage from "./pages/OpportunityListPage";
import "./App.css"
import "./AppForm.css"

const savedUsername = window.localStorage.getItem("username")

function App() {
  const [username, setUsername] = useState(savedUsername)
  //check with !== null whether username is strictly not null, 
  //so if username is undefined or an empty string then it’ll be true
  const loggedIn = username !== null
  //console.log({ loggedIn })
  return (
    <Router>
      <div>
        <Nav loggedIn={loggedIn} setUsername={setUsername}/>
        <Switch>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/opportunities" exact>
            <OpportunityListPage />
          </Route>
          <Route path="/organisations" exact>
            <OrganisationListPage />
          </Route>
          <Route path="/login">
            {loggedIn ? <Redirect to="/" /> :
              <LoginPage setUsername={setUsername}/>
          }
          </Route>
          {/* <Route path="/profile">
            {loggedIn ?  <NewOrganisationPage setUsername={setUsername}/> : <Redirect to="/" />   }
          </Route> */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;