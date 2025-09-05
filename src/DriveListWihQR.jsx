// src/components/DriveListWithQR.js
import React, { useState } from "react";
import QRCode from "react-qr-code";

const dummyDrives = [
  { id: "drive1", company: "TCS", jobTitle: "Engineer", date: "2025-06-15", time: "10:00 AM", ctc: "6 LPA" },
  { id: "drive2", company: "Infosys", jobTitle: "Frontend Dev", date: "2025-06-18", time: "11:00 AM", ctc: "5.5 LPA" },
  { id: "drive3", company: "Wipro", jobTitle: "Backend Dev", date: "2025-06-20", time: "9:00 AM", ctc: "6.5 LPA" },
  { id: "drive4", company: "HCL", jobTitle: "Full Stack", date: "2025-06-22", time: "10:30 AM", ctc: "7 LPA" },
  { id: "drive5", company: "Accenture", jobTitle: "DevOps", date: "2025-06-25", time: "1:00 PM", ctc: "7.5 LPA" },
];

const DriveListWithQR = () => {
  const [selectedDriveId, setSelectedDriveId] = useState(null);

  const handleGenerateQR = (driveId) => {
    setSelectedDriveId(driveId);
  };

  const generateQRUrl = (driveId) => {
    return `${window.location.origin}/scan/drive/${driveId}`;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Available Drives</h2>
      {dummyDrives.map((drive) => (
        <div key={drive.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Company:</strong> {drive.company}</p>
          <p><strong>Job:</strong> {drive.jobTitle}</p>
          <p><strong>Date:</strong> {drive.date}</p>
          <p><strong>Time:</strong> {drive.time}</p>
          <p><strong>CTC:</strong> {drive.ctc}</p>
          <button onClick={() => handleGenerateQR(drive.id)}>Generate QR</button>
          {selectedDriveId === drive.id && (
            <div style={{ marginTop: "1rem" }}>
              <QRCode value={generateQRUrl(drive.id)} size={160} />
              <p>{generateQRUrl(drive.id)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DriveListWithQR;
