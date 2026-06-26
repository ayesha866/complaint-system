import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const UserInfo = () => {
  const [agents, setAgents] = useState([]);
  const [ordinaryUsers, setOrdinaryUsers] = useState([]);
  const [error, setError] = useState("");

  // Replace with your token from localStorage or context
  const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch agents
        const agentRes = await axios.get("http://localhost:8000/api/users/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(agentRes.data);

        // Fetch ordinary users
        const ordinaryRes = await axios.get("http://localhost:8000/api/users/ordinary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrdinaryUsers(ordinaryRes.data);

      } catch (err) {
        if (err.response) {
          // Show server errors
          setError(err.response.data.error || "Something went wrong");
        } else {
          setError("Network error");
        }
      }
    };

    fetchUsers();
  }, [token]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Agents</h2>
      {agents.length === 0 ? (
        <p>No agents to show</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id}>
                <td>{agent._id}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h2 className="mt-4">Ordinary Users</h2>
      {ordinaryUsers.length === 0 ? (
        <p>No ordinary users to show</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {ordinaryUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserInfo;
