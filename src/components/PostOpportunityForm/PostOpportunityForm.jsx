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
    date_close: "",
    is_open: "true",
    date_created: "2020-09-09T20:31:00Z",
  });
  const history = useHistory();
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(credentials),
    });
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
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Project Title"
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
        <label htmlFor="goal">Goal:</label>
        <input
          type="text"
          id="goal"
          placeholder="Goal"
          onChange={handleChange}
          value={credentials.goal}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          placeholder="Image"
          onChange={handleChange}
          value={credentials.image}
        />
      </div>
      <div>
        <label htmlFor="is_open">Project Open:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={credentials.is_open}
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
        Create Project
      </button>
    </form>
  );
}

export default CreateProjectForm;
