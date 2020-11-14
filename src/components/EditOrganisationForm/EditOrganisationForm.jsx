import React, { useState, useEffect } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { getStorage, isAuthenticated } from "../Utilities/LocalStorage"

function EditOrganisationForm(props) {
  //variables

  const [organisationData, setOrganisationData] = useState({
    organisation: "",
    description: "",
    website: "",
    logo: "",
  })
  const history = useHistory()
  const { slug } = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}organisations/${slug}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setOrganisationData(data)
      })
  }, [slug])

  const handleChange = (e) => {
    const { id, value } = e.target
    setOrganisationData((data) => ({
      ...data,
      [id]: value,
    }))
  }

  //method
  const handleChange = (e) => {
    const { id, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }))
  }
  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}organisations/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${getStorage("token")}`,
        },

        body: JSON.stringify(profile),
      }
    )
    return response.json()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    postData().then((response) => {
      if (isAuthenticated()) {
        history.push(`/organisations/${slug}`)
      }
    })
  }

  //template
  return (
    <div className="medium-form">
      <form>
        <div>
          <label htmlFor="organisation">Organisation:</label>
          <input
            type="text"
            id="organisation"
            value={organisationData.organisation}
            onChange={handleChange}
          />
        </div>
        <div className="textarea">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            value={organisationData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            value={organisationData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <img src={profile.logo} alt={`${profile.organisation}`} />
          <input type="text" id="logo" onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update organisations
        </button>
      </form>
    </div>
  )
}

export default EditOrganisationForm
