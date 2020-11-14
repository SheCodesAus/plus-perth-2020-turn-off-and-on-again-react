import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getStorage, isAuthenticated } from "../Utilities/LocalStorage"

function EditOrganisationForm(props) {
  //variables
  const { organisationsData } = props

  const [organisations, setOrganisations] = useState({
    organisation: "",
    description: "",
    website: "",
    logo: "",
  })
  const history = useHistory()
  const { slug } = useParams()

  useEffect(() => {
    if (organisationsData.organisation == null) return
    console.log({ organisationsData })
    setOrganisations({
      organisation: organisationsData.organisation,
      description: organisationsData.description,
      website: organisationsData.website,
      image: organisationsData.logo,
    })
  }, [organisationsData])

  //method
  const handleChange = (e) => {
    const { id, value } = e.target
    setOrganisations((prevOrganisations) => ({
      ...prevOrganisations,
      [id]: value,
    }))
  }
  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}organisations/${slug}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${getStorage("token")}`,
        },
        body: JSON.stringify(organisations),
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
            value={organisations.organisation}
            onChange={handleChange}
          />
        </div>
        <div className="textarea">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            value={organisations.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            value={organisations.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <img src={organisations.logo} alt={`${organisations.organisation}`} />
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
