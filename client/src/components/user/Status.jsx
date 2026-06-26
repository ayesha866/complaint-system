import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatWindow from "../common/ChatWindow";

const Status = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Get user info from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("User not logged in");
          return;
        }

        const user = JSON.parse(storedUser);
        const token = user.token; // Make sure your user object has the JWT token

        let url = "";
        if (user.role === "Ordinary") {
          url = `http://localhost:8000/api/complaints/status/${user._id}`;
        } else if (user.role === "Agent") {
          url = `http://localhost:8000/api/complaints/allcomplaints/${user._id}`;
        } else {
          setError("Forbidden. Your role cannot access this resource.");
          return;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with a status outside 2xx
          if (err.response.status === 401) {
            setError("Unauthorized. Please login again.");
          } else if (err.response.status === 403) {
            setError("Forbidden. You do not have access to this resource.");
          } else {
            setError(`Error: ${err.response.status} - ${err.response.data.message}`);
          }
        } else {
          setError("Network or server error");
        }
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Complaints Status</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && complaints.length === 0 && <p>No complaints found.</p>}
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id}>
            {complaint.name} - {complaint.status}
             <ChatWindow
        complaintId={complaint._id}
        name={JSON.parse(localStorage.getItem("user")).name}
      />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Status;
