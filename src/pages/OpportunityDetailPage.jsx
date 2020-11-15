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
    <div className="detail-box">
      <h2>{opportunityData.title}</h2>
      <h3>{opportunityData.organisation}</h3>
      <a href={opportunityData.website}>{opportunityData.website}</a>
      <p>{opportunityData.description}</p>
      <h4>Apply by: {opportunityData.apply_by_date.substr(0, 10)}</h4>
      <h4>Start date: {opportunityData.start_date.substr(0, 10)}</h4>
      <img src={opportunityData.image} alt={opportunityData.title}/>
      <p>Created by {opportunityData.owner}</p>
      <p>Created on:{" "}{opportunityData.date_created
          ? opportunityData.date_created.substr(0, 10)
          : ""}
      </p>

      <Link className="button-link" to={`/opportunities/edit/${id}`}>Edit</Link>
      <button type="delete" onClick={deleteData}>
        Delete
      </button>
    </div>
  )
}

export default OpportunityDetailPage
