// src/components/Profile.js
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];

    setUser(storedUser);
    setAttendance(storedAttendance.filter((a) => a.userId === storedUser.id));
  }, []);

  
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user?.name}</h2>
      <h3>Your Attendance Codes:</h3>
      <ul>
        {attendance.map((entry, index) => (
          <li key={index}>
            Drive: <strong>{entry.driveId}</strong> → Code: <strong>{entry.code}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
