# Meeting Scheduler

Welcome to the Meeting Scheduler project! This application is designed to help users schedule meetings by offering available time slots and allowing reservations.

## Technologies Used

### Backend

- **Spring Boot**: We chose Spring Boot for our backend framework due to its simplicity and robust features for building RESTful APIs. It allowed us to focus on our application's logic rather than boilerplate code.

- **H2 Database**: For our database, we utilized H2, a lightweight, in-memory database. This choice was suitable for development and testing phases but can be easily switched to a more robust database like PostgreSQL or MySQL for production.

- **Spring Data JPA**: We used Spring Data JPA to simplify database access and entity management. It streamlined our data interactions and reduced boilerplate code.

### Frontend

- **React**: React was our frontend library of choice due to its component-based architecture and fast rendering capabilities. It enabled us to create a dynamic and responsive user interface.

- **Axios**: We used Axios to handle HTTP requests between the frontend and backend. Axios provided a clean and efficient way to interact with our RESTful API.

- **Moment.js**: Moment.js helped us parse and format date and time values, enhancing the user experience when displaying availability and reservations.

- **CSS**: For styling, we leveraged CSS to create a clean and visually appealing user interface. We used CSS to customize modals, tables, buttons, and more.

## Features

- **View Available Time Slots**: Users can see a list of available time slots sorted by date and time.

- **Reserve Time Slots**: Users can reserve available time slots by providing their email, start time, end time, and a title for the reservation.

- **Delete Reservations**: Users can delete their reservations by clicking the "Delete" button in the reservations table.

- **Search Reservations by Email**: Users can search for their reservations by entering their email address, helping them quickly find their scheduled meetings.

- **Admin Panel**: The application includes an admin panel where administrators can add new availabilities. Future development plans may include additional admin features such as viewing all reservations, deleting reservations, and managing availabilities.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/meeting-scheduler.git
