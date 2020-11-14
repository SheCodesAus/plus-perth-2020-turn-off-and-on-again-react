import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function OrganisationDetailPage() {
  const [organisationData, setorganisationData] = useState({
    loading: true,
  })
  const { slug } = useParams()

  const token = window.localStorage.getItem("token")
  const history = useHistory()

  useEffect(() => {
    console.log("slug", slug)
    fetch(`${process.env.REACT_APP_API_URL}organisations/${slug}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        console.log("hello", data)
        setorganisationData(data)
      })
  }, [])

  const deleteData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}organisations/${slug}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
    history.push("/")
  }

  if (organisationData.loading) {
    return "Loading ..."
  }

  return (
    <div>
      <img src={organisationData.logo} alt="organisation" />
      <h3>{organisationData.organisation}</h3>
      <h3>{organisationData.website}</h3>
      <h3>{organisationData.description}</h3>
      <p>Created by {organisationData.owner}</p>

      {/* <PostOpportunityForm opportunityId={id} /> */}
      <hr />
      <button>
        <Link to={`/organisations/${slug}/edit`}>Edit</Link>
      </button>
      <button type="delete" onClick={deleteData}>
        Delete
      </button>
    </div>
  )
}

export default OrganisationDetailPage
