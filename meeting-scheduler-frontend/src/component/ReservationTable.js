import React from 'react';
import axios from 'axios';
import moment from 'moment';


// Function to parse date and time values based on the actual format
const parseDateTime = (dateTimeString) => {
// Implement the parsing logic based on the actual format
// For example, if dateTimeString is in a specific format, you can use libraries like moment.js to parse it.
// Replace the example below with your actual parsing logic.
// Example (assuming dateTimeString is in "YYYY-MM-DDTHH:mm:ss" format):
return moment(dateTimeString, "YYYY,MM,DD,HH,mm,ss").toDate();
};
// console.log(parseDateTime("2016,11,9,11,44,44"))

// Function to format the time
const formatTime = (dateTime) => {
// Implement the time formatting logic based on your preferences
// Example: "HH:mm:ss" here we don't need seconds
return moment(dateTime).format("HH:mm");
};

function ReservationTable({ reservations, handleDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Month</th>
          <th>Year</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Title</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(reservation => (
          <tr key={reservation.id}>
            <td>{new Date(parseDateTime(reservation.startDateTime)).getDate()}</td>
            <td>{new Date(parseDateTime(reservation.startDateTime)).getMonth()+1}</td>
            <td>{new Date(parseDateTime(reservation.startDateTime)).getFullYear()}</td>
            <td>{formatTime(new Date(parseDateTime(reservation.startDateTime)))}</td>
            <td>{formatTime(new Date(parseDateTime(reservation.endDateTime)))}</td>
            <td>{reservation.title}</td>
            <td>{reservation.email}</td>
            <td>
              <button onClick={() => handleDelete(reservation.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReservationTable;
