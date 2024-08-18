import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadTimetable() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [timetable, setTimetable] = useState([{ day: '', startTime: '', endTime: '' }]);

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

    const handleTimetableChange = (index, field, value) => {
        const newTimetable = [...timetable];
        newTimetable[index][field] = value;
        setTimetable(newTimetable);
    };

    const handleAddTimetableEntry = () => {
        setTimetable([...timetable, { day: '', startTime: '', endTime: '' }]);
    };

    const handleRemoveTimetableEntry = (index) => {
        const newTimetable = timetable.filter((_, i) => i !== index);
        setTimetable(newTimetable);
    };

    async function handleUpload(e) {
        e.preventDefault();
        if (!selectedSubject || timetable.some(entry => !entry.day || !entry.startTime || !entry.endTime)) {
            alert('Please complete the timetable entries.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/subjects/${selectedSubject}/timetable`, { timetable });
            alert(response.data);
        } catch (error) {
            console.error('Error uploading timetable:', error);
            alert('Error uploading timetable');
        }
    }

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Upload Timetable</h2>
            <form onSubmit={handleUpload} className="space-y-4">
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
                    <label className="block text-sm font-medium">Timetable</label>
                    {timetable.map((entry, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Day (e.g., Monday)"
                                value={entry.day}
                                onChange={(e) => handleTimetableChange(index, 'day', e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="time"
                                placeholder="Start Time"
                                value={entry.startTime}
                                onChange={(e) => handleTimetableChange(index, 'startTime', e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="time"
                                placeholder="End Time"
                                value={entry.endTime}
                                onChange={(e) => handleTimetableChange(index, 'endTime', e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveTimetableEntry(index)}
                                className="col-span-3 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddTimetableEntry}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Add Timetable Entry
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Upload Timetable
                </button>
            </form>
        </div>
    );
}

export default UploadTimetable;


