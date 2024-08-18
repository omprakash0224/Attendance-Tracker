import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Subjects from "./components/Subjects";
import CreateSubjects from "./components/CreateSubjects";
import UploadTimetable from "./components/UploadTimetable";
import MarkAttendance from "./components/MarkAttendance";
import AttendancePercentage from "./components/AttendancePercentage";
import Dashboard from "./components/Dashboard";
import DisplayTimetable from "./components/DisplayTimetable";
import { useAuth } from "./store/auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/create-subject" element={<CreateSubjects />} />
            <Route path="/upload-timetable/:id" element={<UploadTimetable />} />
            <Route path="/display-timetable" element={<DisplayTimetable />} />
            <Route path="/mark-attendance" element={<MarkAttendance />} />
            <Route path="/attendance-percentage/:studentId" element={<AttendancePercentage />} />
          </Routes>
        </Router>
    </>
  )
}

// function DashboardWrapper() {
//   const { auth } = useAuth();

//   return (
//     <Dashboard studentId={auth.studentId} />
//   );
// }

export default App
