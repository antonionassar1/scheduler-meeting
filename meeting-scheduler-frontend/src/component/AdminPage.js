import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [availability, setAvailability] = useState({
    startDateTime: '',
    endDateTime: '',
  });

  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(null); // State for success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
  };

  const handleAddAvailability = () => {
    setError(null); // Clear any previous error messages
    setSuccess(null); // Clear any previous success messages

    axios
      .post(`http://localhost:8080/api/availability`, {
        startDateTime: availability.startDateTime,
        endDateTime: availability.endDateTime,
      })
      .then((response) => {
        // Handle a successful reservation (e.g., show a success message)
        console.log("Availability added");

        setSuccess("Availability added successfully");
        // You can optionally reset the form fields here
        setAvailability({
          startDateTime: '',
          endDateTime: '',
        });
      })
      .catch((error) => {
        // Handle reservation errors (e.g., show an error message)
        console.error("Error adding availability:", error);

        setError("Error adding availability. Please check the date and time.");
      });
  };

  return (
    <div>
      <h2>Add Availability</h2>
      <form>
        <div>
          <label htmlFor="startDateTime">Start Date and Time:</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={availability.startDateTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDateTime">End Date and Time:</label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            value={availability.endDateTime}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddAvailability}>
          Add Availability
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default AdminPage;
