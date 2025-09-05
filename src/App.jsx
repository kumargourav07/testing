// // src/components/DriveListWithQR.js
// import React, { useState } from "react";
// import QRCode from "react-qr-code";

// const dummyDrives = [
//   {
//     id: "drive1",
//     company: "TCS",
//     jobTitle: "Software Engineer",
//     date: "2025-06-15",
//     time: "10:00 AM",
//     ctc: "6 LPA"
//   },
//   {
//     id: "drive2",
//     company: "Infosys",
//     jobTitle: "Frontend Developer",
//     date: "2025-06-18",
//     time: "11:00 AM",
//     ctc: "5.5 LPA"
//   },
//   {
//     id: "drive3",
//     company: "Wipro",
//     jobTitle: "Backend Developer",
//     date: "2025-06-20",
//     time: "9:00 AM",
//     ctc: "6.5 LPA"
//   },
//   {
//     id: "drive4",
//     company: "HCL",
//     jobTitle: "Full Stack Developer",
//     date: "2025-06-22",
//     time: "10:30 AM",
//     ctc: "7 LPA"
//   },
//   {
//     id: "drive5",
//     company: "Accenture",
//     jobTitle: "DevOps Engineer",
//     date: "2025-06-25",
//     time: "1:00 PM",
//     ctc: "7.5 LPA"
//   }
// ];

// const DriveListWithQR = () => {
//   const [selectedDriveId, setSelectedDriveId] = useState(null);

//   const handleGenerateQR = (driveId) => {
//     setSelectedDriveId(driveId);
//   };

//   const generateQRUrl = (driveId) => {
//     return `${window.location.origin}/scan/drive/${driveId}`;
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Upcoming Walk-In Drives</h2>
//       {dummyDrives.map((drive) => (
//         <div
//           key={drive.id}
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "1rem",
//             marginBottom: "1.5rem"
//           }}
//         >
//           <p><strong>Company:</strong> {drive.company}</p>
//           <p><strong>Job Title:</strong> {drive.jobTitle}</p>
//           <p><strong>Date:</strong> {drive.date}</p>
//           <p><strong>Time:</strong> {drive.time}</p>
//           <p><strong>CTC:</strong> {drive.ctc}</p>

//           <button onClick={() => handleGenerateQR(drive.id)}>
//             Generate QR Code
//           </button>

//           {selectedDriveId === drive.id && (
//             <div style={{ marginTop: "1rem" }}>
//               <QRCode value={generateQRUrl(drive.id)} size={180} />
//               <p>{generateQRUrl(drive.id)}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DriveListWithQR;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DriveListWithQR from "./DriveListWihQR";
import ScanDrive from "./ScanDrive";
import Profile from "./Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/drives" element={<DriveListWithQR />} />
        <Route path="/scan/drive/:driveId" element={<ScanDrive />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
