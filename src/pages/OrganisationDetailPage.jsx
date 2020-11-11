import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function OrganisationDetailPage() {
  const [organisationData, setorganisationData] = useState({
    loading: true,
  })
  const { id } = useParams()

  const token = window.localStorage.getItem("token")
  const history = useHistory()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}organisations/${id}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setorganisationData(data)
      })
  }, [])

  const deleteData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}organisations/${id}`,
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
      <img src={organisationData.logo} alt="organisation"/>
      <h3>{organisationData.organisation}</h3>
      <h3>{organisationData.website}</h3>
      <h3>{organisationData.description}</h3>
      <h3>{organisationData.date_created}</h3>
      <h3>{organisationData.is_open}</h3>
      <p>Created by {organisationData.user}</p>
      <h4>
        Created at:{" "}
        {organisationData.date_created
          ? organisationData.date_created.substr(0, 10)
          : ""}
      </h4>
      <h4>{`Status: ${organisationData.is_open}`}</h4>

      {/* <PostOpportunityForm opportunityId={id} /> */}
      <hr />
      <button>
        <Link to={`/organisation/edit/${id}`}>Edit</Link>
      </button>
      <button type="delete" onClick={deleteData}>
        Delete
      </button>
    </div>
  )
}

export default OrganisationDetailPage