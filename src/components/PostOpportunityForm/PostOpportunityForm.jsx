import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function PostOpportunityForm() {
  //variables
  const [credentials, setCredentials] = useState({
    title: "",
    start_date: "",
    organisation: "",
    audience: "",
    level: "",
    type: "",
    location: "",
    website: "",
    description: "",
    apply_by_date: "",
    is_open: true,
    created_date: "2020-09-09T20:31:00Z",
  });
  const history = useHistory();
  const token = window.localStorage.getItem("token")

  //   const token = window.localStorage.getItem("token");

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}OpportunityListPage/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      postData()
        .then((response) => {
          history.push("/");
          // console.log(response);
        })
        .catch((error) => {
          alert("you have not completed the form");
        });
    }
  };

  //template
  return (
    <div className="medium-form">
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Opportunity Title"
          onChange={handleChange}
          value={credentials.title}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={credentials.description}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          placeholder="Enter Thumbnail Image"
          onChange={handleChange}
          value={credentials.image}
        />
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="start_date"
          id="start_date"
          placeholder="Start Date"
          onChange={handleChange}
          value={credentials.start_date}
        />
      </div>
      <div>
        <label htmlFor="organisation">Organisation:</label>
        <input
          type="text"
          id="organisation"
          placeholder="Organisation Name"
          onChange={handleChange}
          value={credentials.organisation}
        />
      </div>
      <div>
        <label htmlFor="audience">Audience:</label>
        <input
          type="dropdown"
          id="audience"
          placeholder="Target Audience"
          onChange={handleChange}
          value={credentials.audience}
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="dropdown"
          id="level"
          placeholder="Skill level required to attend"
          onChange={handleChange}
          value={credentials.level}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input
          type="dropdown"
          id="type"
          placeholder="Type of opportunity"
          onChange={handleChange}
          value={credentials.type}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="dropdown"
          id="location"
          placeholder="Where is the opportunity based?"
          onChange={handleChange}
          value={credentials.location}
        />
      </div>
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="text"
          id="website"
          placeholder="Enter website link"
          onChange={handleChange}
          value={credentials.website}
        />
      </div>

      <div>
        <label htmlFor="apply_by_date">Apply by Date:</label>
        <input
          type="apply_by_date"
          id="apply_by_date"
          placeholder="Apply by Date"
          onChange={handleChange}
          value={credentials.apply_by_date}
        />
      </div>
      <div>
        <label htmlFor="date_created">Date Created:</label>
        <input
          type="date_created"
          id="date_created"
          placeholder="date_created"
          onChange={handleChange}
          value={credentials.date_created}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create Opportunity
      </button>
    </form>
    </div>
  );
}

export default PostOpportunityForm;
