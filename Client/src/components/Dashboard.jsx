import React from 'react';
import { useAuth } from '../store/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import AttendancePercentage from '../components/AttendancePercentage'; // Import any other components you need

function Dashboard() {
    // Retrieve studentId from localStorage
    const studentId = localStorage.getItem('userId'); // Assuming you stored userId as studentId
    const username = localStorage.getItem('username'); // Assuming you stored userId as studentId

    const  { LogoutUser } = useAuth();

    const navigate = useNavigate();

    function handleLogout() {
        LogoutUser();
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {studentId ? (
                <div>
                    <p className="text-lg">Welcome! <strong>{username}</strong> </p>
                    <p className="text-lg">Your Student ID is: <strong>{studentId}</strong></p>
                    <AttendancePercentage /> {/* Use the AttendancePercentage component */}
                    {/* Include other components or information you want to display */}
                </div>
            ) : (
                <p className="text-red-500">No Student ID found. Please log in.</p>
            )}

            <button
                onClick={handleLogout}
                className="mt-6 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
