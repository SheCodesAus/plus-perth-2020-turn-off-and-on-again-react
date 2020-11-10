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
  }, [])

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
      <img src={opportunityData.image} />
      <h3>{opportunityData.title}</h3>
      <h3>{opportunityData.start_date}</h3>
      <h3>{opportunityData.organisation}</h3>
      <h3>{opportunityData.website}</h3>
      <h3>{opportunityData.description}</h3>
      <h3>{opportunityData.apply_by_date}</h3>
      <h3>{opportunityData.datecreated}</h3>
      <h3>{opportunityData.is_open}</h3>
      <p>Created by {opportunityData.user}</p>
      <h4>
        Created at:{" "}
        {opportunityData.date_created
          ? opportunityData.date_created.substr(0, 10)
          : ""}
      </h4>
      <h4>{`Status: ${opportunityData.is_open}`}</h4>

      {/* <PostOpportunityForm opportunityId={id} /> */}
      <hr />
      <button>
        <Link to={`/opportunity/edit/${id}`}>Edit</Link>
      </button>
      <button type="delete" onClick={deleteData}>
        Delete
      </button>
    </div>
  )
}

export default OpportunityDetailPage
