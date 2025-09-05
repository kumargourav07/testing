// src/ScanDrive.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyDrives = [
  { id: "drive1", company: "TCS", jobTitle: "Engineer", date: "2025-06-15", time: "10:00 AM", ctc: "6 LPA" },
  { id: "drive2", company: "Infosys", jobTitle: "Frontend Dev", date: "2025-06-18", time: "11:00 AM", ctc: "5.5 LPA" },
  { id: "drive3", company: "Wipro", jobTitle: "Backend Dev", date: "2025-06-20", time: "9:00 AM", ctc: "6.5 LPA" },
  { id: "drive4", company: "HCL", jobTitle: "Full Stack", date: "2025-06-22", time: "10:30 AM", ctc: "7 LPA" },
  { id: "drive5", company: "Accenture", jobTitle: "DevOps", date: "2025-06-25", time: "1:00 PM", ctc: "7.5 LPA" },
];

// Function to generate a 3-character alphanumeric code
const generateUniqueCode = (driveId) => {
  const drive = dummyDrives.find(d => d.id === driveId);
  const companyCode = drive?.company?.substring(0, 2).toUpperCase() || "XX"; // First 2 letters

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 3; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${companyCode}${randomPart}`; // e.g., IN9X3
};

const ScanDrive = () => {
  const { driveId } = useParams(); // extract drive ID from URL
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please log in first.");
    navigate("/");
    return;
  }

  const attendanceData = JSON.parse(localStorage.getItem("attendance")) || [];

  const existingEntry = attendanceData.find(
    (entry) => entry.userId === user.id && entry.driveId === driveId
  );

  if (existingEntry) {
    setCode(existingEntry.code);
    setLoading(false);
  } else {
    const newCode = generateUniqueCode(driveId);

    const updatedData = [...attendanceData, {
      userId: user.id,
      driveId: driveId,
      code: newCode,
      timestamp: new Date().toISOString()
    }];

    localStorage.setItem("attendance", JSON.stringify(updatedData));
    setCode(newCode);
    setLoading(false);
  }
}, [driveId, navigate]);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>QR Scanned for Drive: <span style={{ color: "#0077cc" }}>{driveId}</span></h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Your Unique Attendance Code:</h3>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>{code}</div>
          <button style={{ marginTop: "1.5rem" }} onClick={() => navigate("/profile")}>
            Go to Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ScanDrive;
