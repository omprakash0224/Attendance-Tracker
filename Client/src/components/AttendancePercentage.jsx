import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendancePercentage() {
    const [percentage, setPercentage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendancePercentage = async () => {
            const studentId = localStorage.getItem('userId'); // Retrieve studentId from localStorage

            if (studentId) {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:5000/api/auth/attendance/percentage/${studentId}`);
                    setPercentage(response.data.percentage);
                } catch (err) {
                    console.error('Error fetching attendance percentage:', err);
                    setError('Failed to fetch attendance percentage');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No student ID found');
                setLoading(false);
            }
        };

        fetchAttendancePercentage();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Attendance Percentage</h2>
            {percentage !== null ? (
                <p className="text-lg">
                    Your attendance percentage is: <strong>{percentage.toFixed(2)}%</strong>
                </p>
            ) : (
                <p>No attendance records found.</p>
            )}
        </div>
    );
}

export default AttendancePercentage;

