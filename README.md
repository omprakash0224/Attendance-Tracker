# Attendance Tracker

The Attendance Tracker is a web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to manage and track attendance for various subjects. The application supports features such as user authentication, timetable management, and subject-specific attendance tracking.

## Features

+ **User Authentication:** Secure login and registration using JWT.
+ **Timetable Management:** Upload and manage timetables for different days of the week.
+ **Subject Management:** Create and manage subjects.
+ **Attendance Tracking:** Mark and view attendance for each subject.

## Technology Stack
+ **Frontend:** React.js, Tailwind CSS
+ **Backend:** Node.js, Express.js
+ **Database:** MongoDB
+ **Authentication:** JSON Web Token (JWT)
+ **Styling:** Tailwind CSS


## Installation

**Prerequisites**
+ Node.js
+ npm or yarn
+ MongoDB

**Clone the Repository**

```bash
git clone https://github.com/yourusername/attendance-tracker.git
cd attendance-tracker
```

**Install Dependencies**

**For the Backend**

```bash
cd Backend
npm install bcryptjs cors dotenv express jsonwebtoken mongoose react-toastify uuid zod
``` 

**For the Frontend**

```bash
cd Client
npm install react react-dom axios react-router-dom react-toastify
```

**Environment Variables**

Create a `.env` file in the backend directory with the following:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
```

**Run the Application**

## Usage

**1. Register/Login:** Users can register a new account or log in with existing credentials.

**2.Create Timetable:** Users can upload and manage their timetables.

**3.Create Subjects:** Users can create subjects.

**4.Mark Attendance:** Users can mark attendance for each subject on the timetable.

**5.View Attendance:** Users can view the attendance records.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.
