import React, { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import OrganisationCard from "../components/OrganisationCard/OrganisationCard"

function OrganisationListPage() {
  // variables

  const [organisationList, setOrganisationList] = useState({
    loading: true,
  })

  // methods: useEffect render when the app render, the bracket while have the condition for the useEffect to rerender when app change
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}organisations/`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setOrganisationList(data)
      })
  }, [])

  if (organisationList.loading) {
    return (
      <ReactLoading className="bubbles" type={"Bubbles"} color={"#FE4A49"} />
    )
  }

  // template
  return (
    <div>
      <div className="mainContent">
        <h1> Organisations </h1>
        <p id="page-blurb">These organisations have recently uploaded new learning opportunities to help you progress your skills in Tech.</p>
        <p id="page-blurb">Click through to see their latest offerings.</p>
        <div id="organisation-list">
          {organisationList.map((organisationData, key) => {
            return (
              <OrganisationCard key={key} organisationData={organisationData} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrganisationListPage
