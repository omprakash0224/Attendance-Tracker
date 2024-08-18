import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        }
        fetchSubjects();
    }, []);

    async function deleteSubject(id) {
        try {
            await axios.delete(`http://localhost:5000/api/auth/subjects/${id}`);
            setSubjects(subjects.filter(subject => subject._id !== id));
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    }
    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Subjects</h2>
            <ul className="space-y-2">
                {subjects.map(subject => (
                    <li key={subject._id} className="flex justify-between items-center p-2 border rounded">
                        <span>{subject.name}
                            <Link to={`/upload-timetable/${subject._id}`} className="bg-green-500 text-white py-1 px-2 rounded ml-2">Upload Timetable</Link>
                        </span>
                        <button
                            onClick={() => deleteSubject(subject._id)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Subjects
