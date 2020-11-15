import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Nav from "./components/Nav/Nav"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import EditOrganisationPage from "./pages/EditOrganisationPage"
import NewOrganisationPage from "./pages/NewOrganisationPage"
import OrganisationListPage from "./pages/OrganisationListPage"
import PostOpportunityForm from "./components/PostOpportunityForm/PostOpportunityForm"
import OpportunityListPage from "./pages/OpportunityListPage"
import OpportunityDetailPage from "./pages/OpportunityDetailPage"
import OrganisationDetailPage from "./pages/OrganisationDetailPage"
import SelectOrganisationPage from "./pages/SelectOrganisationPage"
import EditOpportunityPage from "./pages/EditOpportunityPage"
import Footer from "./components/Footer/Footer"


import "./App.css"
import "./AppForm.css"

const savedUsername = window.localStorage.getItem("username")
const savedOrganisation = window.localStorage.getItem("organisation")


function App() {
  const [username, setUsername] = useState(savedUsername)
  const [organisation, setOrganisation] = useState(savedOrganisation)
  //check with !== null whether username is strictly not null,
  //so if username is undefined or an empty string then it’ll be true
  const loggedIn = username !== null
  //console.log({ loggedIn })

  return (
    <Router>
      <div>
        <Nav loggedIn={loggedIn} setUsername={setUsername} setOrganisation={setOrganisation} />
        <Switch>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/opportunities/create" exact>
            <PostOpportunityForm />
          </Route>
          <Route path="/opportunities" exact>
            <OpportunityListPage />
          </Route>
          <Route path="/opportunities/:id" exact>
            <OpportunityDetailPage />
          </Route>
          <Route path="/opportunities/type/:slug" exact>
            <OpportunityListPage/>
            </Route>
          <Route path="/opportunities/edit/:id" exact>
            <EditOpportunityPage />
          </Route>
          <Route path="/organisations" exact>
            <OrganisationListPage />
          </Route>
          <Route path="/organisations/register" exact>
            <NewOrganisationPage />
          </Route>
          <Route path="/organisations/select" exact>
            <SelectOrganisationPage />
          </Route>
          <Route path="/organisations/:slug" exact>
            <OrganisationDetailPage />
          </Route>
          <Route path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LoginPage setUsername={setUsername} setOrganisation={setOrganisation}/>
            )}
          </Route>
          <Route path="/organisations/:slug/edit" exact>
            {loggedIn ? (
              <EditOrganisationPage setUsername={setUsername}/>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            <HomePage loggedIn={loggedIn}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    
  )
}

export default App
