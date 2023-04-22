import React, { useState } from 'react';

function CohortForm() {
  const [cohortData, setCohortData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    user_id: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCohortData({ ...cohortData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/cohorts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cohortData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Create Cohort</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cohortData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={cohortData.start_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={cohortData.end_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={cohortData.user_id}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Cohort</button>
      </form>
    </div>
  );
}

export default CohortForm;