import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

function OpportunityDetailPage() {
  const [opportunityData, setopportunityData] = useState({
    loading: true,
  })
  const { id } = useParams()
  const history = useHistory()
  const token = window.localStorage.getItem("token")

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
    await fetch(`${process.env.REACT_APP_API_URL}listing/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    history.push("/")
  }

  if (opportunityData.loading) {
    return "Loading ..."
  }

  //show edit and delete buttons if the logged in user organisation is the same as the page loaded
  //or if admin is logged in
  let canEdit = false
  if (
    window.localStorage.getItem("organisation") ===
      opportunityData.organisation ||
    window.localStorage.getItem("username") === "admin"
  ) {
    canEdit = true
  }
  // console.log("can edit is", canEdit)

  return (
    <div className="detail-box">
      <h1>{opportunityData.title}</h1>
      <img className="oppdetail-img" src={opportunityData.image} alt={opportunityData.title} />
      <h2 className="oppdetail-h2">Opportunity Details</h2>
      <a className="oppdetail-a" href={opportunityData.link}>{opportunityData.link}</a>
      <p className="oppdetail-p">{opportunityData.description}</p>
      <h2 className="oppdetail-h2">Key Dates</h2>
      <h4 className="oppdetail-h4">Apply by: {opportunityData.apply_by_date.substr(0, 10)}</h4>
      <h4 className="oppdetail-h4">Start date: {opportunityData.start_date.substr(0, 10)}</h4>
      <p className="oppdetail-p">Created by {opportunityData.owner}</p>
      <p className="oppdetail-p">
        Created on:{" "}
        {opportunityData.date_created
          ? opportunityData.date_created.substr(0, 10)
          : ""}
      </p>

      {canEdit ? (
        <Link className="button-link" to={`/opportunities/edit/${id}`}>
          Edit
        </Link>
      ) : (
        ""
      )}
      {canEdit ? (
        <button type="delete" onClick={deleteData}>
          Delete
        </button>
      ) : (
        ""
      )}
    </div>
  )
}

export default OpportunityDetailPage
