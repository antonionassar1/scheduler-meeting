import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './table.css'; 
import './Modal.css'; // Import the CSS styles for the modal
import ReservationPopup from './ReservationPopup';

function AvailableSlots( fetchAvailabilities) {
  const [availabilities, setAvailabilities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState(null); // Store the selected availability ID here
  const [availabilityStartTime, setAvailabilityStartTime] = useState(null); // Store the selected availability ID here
  const [availabilityEndTime, setAvailabilityEndTime] = useState(null); // Store the selected availability ID here
  
  
  useEffect(() => {
    // Fetch availabilities from the backend
    axios.get('http://localhost:8080/api/availability')
      .then(response => {
        const formattedAvailabilities = response.data.map(availability => {
          const startDateTime = new Date(parseDateTime(availability.startDateTime));
          const endDateTime = new Date(parseDateTime(availability.endDateTime));

          return {
            id: availability.id,
            year: startDateTime.getFullYear(),
            month : (startDateTime.getMonth() + 1).toString().padStart(2, "0"),
            day   : startDateTime.getDate().toString().padStart(2, "0"),
            start_time: formatTime(startDateTime),
            end_time: formatTime(endDateTime),
          };
        });
        setAvailabilities(formattedAvailabilities);
      })
      .catch(error => {
        console.error('Error fetching availabilities:', error);
      });
  }, []);

  const handleReserveClick = (availabilityId,availabilityStartTime,availabilityEndTime) => {
    console.log('Reserve button clicked' + availabilityStartTime);
    setSelectedAvailability(availabilityId); // Store the selected availability ID
    setAvailabilityStartTime(availabilityStartTime);
    setAvailabilityEndTime(availabilityEndTime);
    setShowPopup(true); // Show the popup when Reserve is clicked
  };


  

  // Function to parse date and time values based on the actual format
  const parseDateTime = (dateTimeString) => {
    return moment(dateTimeString, "YYYY,MM,DD,HH,mm,ss").toDate();
  };

  // Function to format the time
  const formatTime = (dateTime) => {
    return moment(dateTime).format("HH:mm");
  };

  return (
    <div>
      {/* Table displaying availabilities */}
      <h2 className="table-title">Available Time Slots</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map(availability => (
            <tr key={availability.id}>
              <td>{availability.day}</td>
              <td>{availability.month}</td>
              <td>{availability.year}</td>
              <td>{availability.start_time}</td>
              <td>{availability.end_time}</td>
              <td>
                <button onClick={() => handleReserveClick(availability.id,availability.year.toString()+availability.month.toString()+availability.day.toString()+availability.start_time,availability.end_time)}>

                  Reserve
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>

    {/* Reservation Modal */}
    {showPopup && (
        <ReservationPopup
          onClose={() => setShowPopup(false)} // Close the popup
          onReserve={(reservationData) => {
            // Handle reservation data and send it to the backend
            console.log('Reservation data:', reservationData);
           
             // Close the popup after reservation
          }}
          availabilityId = {selectedAvailability}
          availabilityStartTime = {availabilityStartTime}
          availabilityEndTime = {availabilityEndTime}
          fetchAvailabilities = {fetchAvailabilities}
        />
      )}
      
    </div>
  );
}

export default AvailableSlots;
