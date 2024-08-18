import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSubjects = () => {
    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(''); // State for selected student
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all students (users)
                const studentResponse = await axios.get('http://localhost:5000/api/auth/users');
                setStudents(studentResponse.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }

        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Post request to create subject for the selected student
            await axios.post(
                `http://localhost:5000/api/auth/subjects`,
                { name }
            );
            navigate('/subjects');
        } catch (error) {
            console.error('Error creating subject:', error);
        }
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Create Subject</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Subject Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateSubjects;


