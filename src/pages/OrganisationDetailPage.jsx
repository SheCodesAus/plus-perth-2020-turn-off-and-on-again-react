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
    <div className="detail-box">
      <img src={organisationData.logo} alt="organisation" />
      <h2>{organisationData.organisation}</h2>
      <a href={organisationData.website}>{organisationData.website}</a>
      <p>{organisationData.description}</p>
      
        <Link className="button-link" to={`/organisations/${slug}/edit`}>Edit</Link>
    </div>
  )
}

export default OrganisationDetailPage
