import React from 'react'

const TimetableDisplay = ({ timetable }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.subject}</td>
                            <td>{entry.date}</td>
                            <td>{entry.day}</td>
                            <td>{entry.startTime}</td>
                            <td>{entry.endTime}</td>
                            <td>
                                <button onClick={() => markAttendance(index)}>Mark Attendance</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TimetableDisplay
