import React, { useState, useEffect } from "react";

const MyForm = () => {
  const [name, setName] = useState("");      // 👈 Separate state for name
  const [email, setEmail] = useState("");    // 👈 Separate state for email
  const [message, setMessage] = useState(""); // 👈 Separate state for message

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Separate variable to store submitted data

  // Function to handle "Submit" button click
  const handleButtonClick = () => {
    setIsSubmitted(true);

    const data = {
      name: name,
      email: email,
      message: message,
    };
    setSubmittedData(data);

    console.log("✅ Form Submitted! Data sent to Database A:");
    console.log(data);
  };

  // Handle form abandonment (close, refresh, navigate away)
  useEffect(() => {
    const handleUnload = (e) => {
      if (!isSubmitted && (name || email || message)) {
        console.log("⚠️ User left! Partial data saved to Database B:");
        console.log({ name, email, message });
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [name, email, message, isSubmitted]);

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <textarea
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      /><br />
      <button onClick={handleButtonClick}>Submit</button>

      <a href="https://www.youtube.com/">click</a>
    </>
  );
};

export default MyForm;
