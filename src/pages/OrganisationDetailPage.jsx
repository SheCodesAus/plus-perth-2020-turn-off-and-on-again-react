import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

function OrganisationDetailPage() {
  const [organisationData, setorganisationData] = useState({
    loading: true,
  })
  const { slug } = useParams()

  useEffect(() => {
    // console.log("slug", slug)
    fetch(`${process.env.REACT_APP_API_URL}organisations/${slug}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        // console.log("hello", data)
        setorganisationData(data)
      })
  }, [slug])

  //show edit button if the logged in user organisation is the same as the page loaded
  //or if admin is logged in
  let canEdit = false
  if (
    window.localStorage.getItem("organisation") ===
      organisationData.organisation ||
    window.localStorage.getItem("username") === "admin"
  ) {
    canEdit = true
  }
  // console.log("can edit is", canEdit)

  // const deleteData = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL}organisations/${slug}`,
  //     {
  //       method: "delete",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   )
  //   history.push("/")
  // }

  if (organisationData.loading) {
    return "Loading ..."
  }

  return (
      <div className="mainContent"> 
        <div className="detail-box">
          <img src={organisationData.logo} alt="organisation" />
          <h2>{organisationData.organisation}</h2>
          <a href={organisationData.website}>{organisationData.website}</a>
          <p>{organisationData.description}</p>
          {canEdit ? <Link className="button-link" to={`/organisations/${slug}/edit`}>Edit</Link> : ""}
            
        </div>
    </div>

  )
}

export default OrganisationDetailPage
