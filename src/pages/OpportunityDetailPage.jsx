import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function OpportunityDetailPage() {
  const [opportunityData, setopportunityData] = useState({
    loading: true,
  })
  const { id } = useParams()

  const token = window.localStorage.getItem("token")
  const history = useHistory()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}listing/${id}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setopportunityData(data)
      })
  }, [id])

  const deleteData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/${id}`,
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

  if (opportunityData.loading) {
    return "Loading ..."
  }

  return (
    <div>
      <img src={opportunityData.image} alt={opportunityData.title} />
      <h1>{opportunityData.title}</h1>
      <h1>{opportunityData.organisation}</h1>
      <h2>
        Start Date:{" "}
        {opportunityData.start_date
          ? opportunityData.start_date.substr(0, 10)
          : ""}
      </h2>
      <h4>{opportunityData.website}</h4>
      <h5>{opportunityData.description}</h5>
      <h3>
        {" "}
        Applications close:{" "}
        {opportunityData.apply_by_date
          ? opportunityData.apply_by_date.substr(0, 10)
          : ""}
      </h3>
      <h3>{opportunityData.datecreated}</h3>
      <h5>Created by {opportunityData.owner}</h5>
      {/* <h6>
        Created at:{" "}
        {opportunityData.date_created
          ? opportunityData.date_created.substr(0, 10)
          : ""}
      </h6> */}
      {/* <h4>{`Status: ${opportunityData.is_open}`}</h4> */}

      <hr />
      <button>
        <Link to={`/opportunities/edit/${id}`}>Edit</Link>
      </button>
      {/* <button type="delete" onClick={deleteData}>
        Delete
      </button> */}
    </div>
  )
}

export default OpportunityDetailPage
