import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import TimetableDisplay from '../components/TimetableDisplay'

const TimeTableForm = () => {
    const [timetable, setTimetable] = useState([{ subject: '', day: '', startTime: '', endTime: '' }]);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleChange = (index, event) => {
        const values = [...timetable];
        values[index][event.target.name] = event.target.value;
        setTimetable(values);
    };

    const handleAddRow = () => {
        setTimetable([...timetable, { subject: '', day: '', startTime: '', endTime: '' }]);
    };

    const handleRemoveRow = (index) => {
        const values = [...timetable];
        values.splice(index, 1);
        setTimetable(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Timetable:', timetable);
        setSubmitted(true);
        // Add your API call here to submit the timetable
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {timetable.map((entry, index) => (
                    <div key={index} className="timetable-row">
                        <div>
                            <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="username">Subject</label>
                            <br />
                            <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                                type="text"
                                name="subject"
                                value={entry.subject}
                                onChange={(event) => handleChange(index, event)}
                                placeholder="Subject"
                            />
                        </div>
                        {/* <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="username">Date</label>
                        <br />
                            <input
                                type="text"
                                name="date"
                                value={entry.date}
                                onChange={(event) => handleChange(index, event)}
                                placeholder="Date"
                            />
                        </div> */}
                        <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="username">Day</label>
                        <br />
                            <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                                type="text"
                                name="day"
                                value={entry.day}
                                onChange={(event) => handleChange(index, event)}
                                placeholder="Day"
                            />
                        </div>
                        <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="username">Start Time</label>
                        <br />
                            <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                                type="time"
                                name="startTime"
                                value={entry.startTime}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                        <label className='font-medium text-xl md:text-3xl ml-6' htmlFor="username">End Time</label>
                        <br />
                            <input className=' w-3/4 md:w-3/4 p-4 m-3 border border-gray-400 rounded-lg'
                                type="time"
                                name="endTime"
                                value={entry.endTime}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl p-4 text-center m-3" onClick={() => handleRemoveRow(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl p-4 text-center m-3" onClick={handleAddRow}>Add Row</button>
                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl p-4 text-center m-3">Submit</button>
            </form>
            {submitted && <TimetableDisplay timetable={timetable} />}
        </div>
    )
}

export default TimeTableForm
