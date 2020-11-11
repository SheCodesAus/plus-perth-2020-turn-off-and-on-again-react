import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { isAuthenticated } from "../components/Utilities/LocalStorage"

function SelectOrganisationPage() {
  const location = useLocation()
  const [isloggedin, setisloggedin] = useState(false)

  useEffect(() => {
    isAuthenticated() ? setisloggedin(true) : setisloggedin(false)
  }, [location])

  // template
  return (
    <div>
      <div className="project-header">
        <h1> Select Organisation </h1>
        <div id="react-search"></div>
      </div>

      {isloggedin ? (
        <div>
          <Link id="link" to={`/organisations/register`}>
            Register New Organisation
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default SelectOrganisationPage
