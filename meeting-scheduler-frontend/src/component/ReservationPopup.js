import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import './Modal.css'; // Style the modal using CSS

function ReservationPopup({ onClose, onReserve,availabilityId,availabilityStartTime,availabilityEndTime,fetchAvailabilities }) {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');


function isValidTimeFormat(timeString) {
    // Define a regular expression pattern for "HH:mm" format
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  
    // Use the test method to check if the string matches the pattern
    return timePattern.test(timeString);
  }

  const handleReserve = () => {
   // console.log('Reservation data:', email,title,startTime,endTime,availabilityId,availabilityStartTime,availabilityEndTime );
    // extract hours from start time
    const availabilityStartTimeleft = availabilityStartTime.substr(availabilityStartTime.length-5);
    console.log('Reservation data:',availabilityStartTimeleft,availabilityEndTime );
    if (!validateEmail(email)) {
       setErrorMessage('Invalid email format');
      }
    
    else if (startTime < availabilityStartTimeleft || endTime > availabilityEndTime) {
        setErrorMessage('Invalid time, change the time to be within the availability time');
      }

    else  if (startTime >= endTime) {
        setErrorMessage('Invalid time...');
      }

    else if (title === '') {
        setErrorMessage('Invalid title');
    }
    //handle if end or start time are random strings and not numbers
    else if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
        setErrorMessage('Invalid time format!');
    }


    else {
        // process start time and end time
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        console.log("tzoffset",tzoffset);
        const startTimeleft = (parseDateTime(availabilityStartTime.substr(0,availabilityStartTime.length-5)+startTime));
        const endTimeleft = parseDateTime(availabilityStartTime.substr(0,availabilityStartTime.length-5)+endTime);
        console.log('Reservation data:',startTimeleft," " + endTimeleft );
        axios
        .post(`http://localhost:8080/api/reservations/${availabilityId}`, {
            "startDateTime": startTimeleft,
            "endDateTime": endTimeleft,
            "title": title,
            "email": email
        })
        .then((response) => {
          // Handle a successful reservation (e.g., show a success message)
          setSuccessMessage('Reservation successful! ');
          
          // Close the popup
          setTimeout(() => { onClose(); }, 1000)
          
          //fetchAvailabilities();
        })
        .catch((error) => {
          // Handle reservation errors (e.g., show an error message)
          setErrorMessage('Error making reservation, this availability might not be available anymore, refresh the page and try again');
          console.error('Error making reservation:', error);
        });

        console.log(startTimeleft);
        console.log(endTimeleft);
        // console.log(availabilityStartTime.substr(0,availabilityStartTime.length-4));
        // console.log(availabilityStartTime.substr(0,availabilityStartTime.length));

      }
    
  };

  const parseDateTime = (dateTimeString) => {
    //moment.tz.setDefault();
    let res = moment(dateTimeString, "YYYYMMDDHH:mm").local().format().toString();
    return res.substr(0,res.length-6);
  };

  const validateEmail = (email) => {
    // You can use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Reservation Details</h3>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Start Time:</label>
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={handleReserve}>Reserve</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ReservationPopup;
