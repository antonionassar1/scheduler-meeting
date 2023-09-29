import React, { useState } from 'react';
import axios from 'axios';

function ReservationActions({ email, setEmail, fetchReservations }) {

  const handleSearch = () => {
    // Trigger the API request to fetch reservations by email
    fetchReservations();
  };

  // const handleDelete = () => {
  //   // Trigger the API request to delete a reservation by ID and email
  //   axios.delete(`http://localhost:8080/api/reservations/${reservationId}?email=${email}`)
  //     .then(() => {
  //       // Clear the reservation ID input and refetch reservations
  //       setReservationId('');
  //       fetchReservations();
  //     })
  //     .catch(error => {
  //       console.error('Error deleting reservation:', error);
  //     });
  // };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {/* <input
        type="text"
        placeholder="Reservation ID"
        value={reservationId}
        onChange={e => setReservationId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
}

export default ReservationActions;
