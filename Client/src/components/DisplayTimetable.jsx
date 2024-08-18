import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayTimetable() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [timetable, setTimetable] = useState([]);

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

    useEffect(() => {
        async function fetchTimetable() {
            if (!selectedSubject) return;

            try {
                const response = await axios.get(`http://localhost:5000/api/auth/subjects/${selectedSubject}/timetable`);
                const timetableData = response.data.timetable || []; // Default to an empty array if timetable is undefined or null
                setTimetable(timetableData);
            } catch (error) {
                console.error('Error fetching timetable:', error);
                setTimetable([]); // Set to an empty array on error
            }
        }

        fetchTimetable();
    }, [selectedSubject]);

    const handleDelete = async (entryId) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/subjects/${selectedSubject}/timetable/${entryId}`);
            setTimetable(timetable.filter(entry => entry._id !== entryId)); // Update the state after deletion
        } catch (error) {
            console.error('Error deleting timetable entry:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">View Timetable</h2>
            <div>
                <label className="block text-sm font-medium">Select Subject</label>
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map(subject => (
                        <option key={subject._id} value={subject._id}>{subject.name}</option>
                    ))}
                </select>
            </div>

            {timetable.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Timetable:</h3>
                    <ul className="mt-4 space-y-2">
                        {timetable.map((entry, index) => (
                            <li key={index} className="p-2 border rounded bg-gray-100 flex justify-between items-center">
                                <div>
                                    <span className="font-bold">{entry.day}:</span> {entry.startTime} - {entry.endTime}
                                </div>
                                <button
                                    onClick={() => handleDelete(entry._id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                selectedSubject && <p className="mt-4">No timetable available for this subject.</p>
            )}
        </div>
    );
}

export default DisplayTimetable;


