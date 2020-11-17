import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { isAuthenticated } from "../Utilities/LocalStorage"

function EditOrganisationForm() {
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

  const handleChangeImage = (e) => {
    e.persist();
    setOrganisationData((data) => ({
        ...data,
        logo: e.target.files[0],
    }));
  };

  const token = window.localStorage.getItem("token")
  const id = window.localStorage.getItem("id")


  const postData = async() => {
    
      try{
          let form_data = new FormData();
          form_data.append('logo', organisationData.logo);
          form_data.append('description', organisationData.description);
          form_data.append('website', organisationData.website);
          form_data.append('organisation', organisationData.organisation);
          
          const response = await fetch
          (`${process.env.REACT_APP_API_URL}organisations/${slug}`, 
          {
              method: "put",
              headers: {
                  Authorization: `token ${token}`,
              },
              body: form_data,
          }
          );
          const data = await response.json() 

          const org = organisationData.organisation
          await fetch
          (`${process.env.REACT_APP_API_URL}users/${id}`, 
          {
              method: "put",
              headers: {
                  Authorization: `token ${token}`,
              },
              body: org ,
          }
          );
          window.localStorage.setItem("organisation", data.organisation)
      if ( organisationData.organisation && organisationData.description  && organisationData.website  && organisationData.logo !== undefined ) {
          
          history.push("/");
          return data
      } else {
          alert("Give us more details, all fields are required :)")
      }
  }catch (error) {
      alert("Network error", error.message)
  }
}

  const handleSubmit = (e) => {
    e.preventDefault()

    postData().then((response) => {
      console.log(organisationData)
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
          <label htmlFor="logo">Upload your logo:</label>
          <img src={organisationData.logo} alt={`${organisationData.title}`}/>
          <input
            type="file"
            id="logo"
            placeholder="logo"
            onChange={handleChangeImage}
            accept="image/*"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update organisations
        </button>
      </form>
    </div>
  )
}

export default EditOrganisationForm
