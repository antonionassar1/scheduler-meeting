import React, { useState, useEffect } from 'react';
import { Router ,Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import AvailableSlots from './component/AvailableSlots';
import ReservationTable from './component/ReservationTable';
import ReservationActions from './component/ReservationActions';
import AdminPage from './component/AdminPage';


const parseDateTime = (dateTimeString) => {
  return moment(dateTimeString, "YYYY,MM,DD,HH,mm,ss").toDate();
};

// Function to format the time
const formatTime = (dateTime) => {
  return moment(dateTime).format("HH:mm");
};


// function App() {
//   const [email, setEmail] = useState('');
//   const [reservations, setReservations] = useState([]);
//   const [availabilities, setAvailabilities] = useState([]);

//   useEffect(() => {
//     // Fetch reservations initially (you can trigger this when needed)
//     fetchReservations();
//     fetchAvailabilities();
//   }, [email]); // Add 'email' as a dependency to refetch when the email changes

//   const fetchReservations = () => {
//     // Make an API request to get reservations by email
//     axios.get(`http://localhost:8080/api/reservations?email=${email}`)
//       .then(response => {
//         setReservations(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching reservations:', error);
//       });
//   };

//   const fetchAvailabilities = () => {
//     axios.get('http://localhost:8080/api/availability')
//     .then(response => {
//       setAvailabilities(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching availabilities:', error);
//     });

//   }

 

 

//   const handleDelete = (reservationId) => {
//     axios.delete(`http://localhost:8080/api/reservations/${reservationId}`)
//       .then(() => {
//         // Remove the deleted reservation from reservations state
//        fetchReservations();
//        fetchAvailabilities();
//       })
//       .catch(error => {
//         console.error('Error deleting reservation:', error);
//       });
//   };

  

//   return (
//     <div>
      // <h1 className="app-title">  ⏰  🕒 ⏰ 🕒Welcome to the Meeting Scheduler</h1>

//       <AvailableSlots
//       availabilities = {availabilities}
//       fetchAvailabilities = { fetchAvailabilities} />

//       {/* Reservation Table */}
//       <h2 className="table-title">Reservations
//       <ReservationActions
//         email={email}
//         setEmail={setEmail}
//         fetchReservations={fetchReservations}
//       />
//       </h2>
  
//       <ReservationTable reservations={reservations} handleDelete = {handleDelete} />
//     </div>
//   );
// }

// export default App;







function App() {

  const [email, setEmail] = useState('');
  const [reservations, setReservations] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // Fetch reservations initially (you can trigger this when needed)
    fetchReservations();
    fetchAvailabilities();
  }, [email]); // Add 'email' as a dependency to refetch when the email changes

  const fetchReservations = () => {
    // Make an API request to get reservations by email
    axios.get(`http://localhost:8080/api/reservations?email=${email}`)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  };

  const fetchAvailabilities = () => {
    axios.get('http://localhost:8080/api/availability')
    .then(response => {
      setAvailabilities(response.data);
    })
    .catch(error => {
      console.error('Error fetching availabilities:', error);
    });

  }

 

 

  const handleDelete = (reservationId) => {
    axios.delete(`http://localhost:8080/api/reservations/${reservationId}`)
      .then(() => {
        // Remove the deleted reservation from reservations state
       fetchReservations();
       fetchAvailabilities();
      })
      .catch(error => {
        console.error('Error deleting reservation:', error);
      });
  };




  return (

    <div>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">AdminPage</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div>
          <h1 className="app-title">⏰ 🕒 ⏰ 🕒Welcome to the Meeting Scheduler</h1>
          <AvailableSlots
            availabilities={availabilities}
            fetchAvailabilities={fetchAvailabilities}
          />
          {/* Reservation Table */}
          <h2 className="table-title">
            Reservations
            <ReservationActions
              email={email}
              setEmail={setEmail}
              fetchReservations={fetchReservations}
            />
          </h2>
          <ReservationTable reservations={reservations} handleDelete={handleDelete} />
        </div>} />

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
    </div>
  );




  // return (
  //   <Router>
  //     <Switch>
  //       <Route path="/admin">
  //         <AdminPage />
  //       </Route>
  //       <Route path="/">
  //       <div>
  //     <h1 className="app-title">  ⏰  🕒 ⏰ 🕒Welcome to the Meeting Scheduler</h1>

  //     <AvailableSlots
  //     availabilities = {availabilities}
  //     fetchAvailabilities = { fetchAvailabilities} />

  //     {/* Reservation Table */}
  //     <h2 className="table-title">Reservations
  //     <ReservationActions
  //       email={email}
  //       setEmail={setEmail}
  //       fetchReservations={fetchReservations}
  //     />
  //     </h2>
  
  //     <ReservationTable reservations={reservations} handleDelete = {handleDelete} />
  //   </div>
  //       </Route>
  //     </Switch>
  //   </Router>
  // );
}

export default App;

