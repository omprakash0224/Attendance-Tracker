import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarkAttendance() {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all subjects
                const subjectResponse = await axios.get('http://localhost:5000/api/auth/subjects');
                setSubjects(subjectResponse.data);

                // Fetch all students (users)
                const studentResponse = await axios.get('http://localhost:5000/api/auth/users');
                setStudents(studentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedSubject || !selectedStudent || !date || !status) {
            alert('Please complete all fields.');
            return;
        }

        try {
            const attendanceData = {
                subject: selectedSubject,
                student: selectedStudent,
                date,
                status,
            };

            const response = await axios.post('http://localhost:5000/api/auth/attendance', attendanceData);
            alert(response.data);
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('Error marking attendance');
        }
    }

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Select Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="" disabled>Select a subject</option>
                        {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>{subject.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Select Student</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="" disabled>Select a student</option>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>{student.username}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="" disabled>Select status</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Mark Attendance
                </button>
            </form>
        </div>
    );
}

export default MarkAttendance;

