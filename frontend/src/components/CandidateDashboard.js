import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [candidateName, setCandidateName] = useState(localStorage.getItem('candidateName')); // Get the candidate name from localStorage
  const [progress, setProgress] = useState({});

  // Fetch projects assigned to the candidate
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/projects/${candidateName}`);
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    if (candidateName) {
      fetchProjects();
    }
  }, [candidateName]);

  // Handle progress update
  const handleProgressUpdate = async (projectId) => {
    const newProgress = progress[projectId] || 0;

    try {
      const response = await axios.put(`http://localhost:5005/api/projects/${projectId}`, {
        progress: parseInt(newProgress),
      });
      alert("Progress updated successfully!");
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? response.data : project
        )
      );
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  return (
    <div>
      <h1>Candidate Dashboard</h1>
      <h2>Welcome, {candidateName}</h2>

      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{project.title}</h3>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Progress:</strong> {project.progress}%</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Score:</strong> {project.score}</p>

            <div>
              <input
                type="number"
                placeholder="Update Progress (0-100)"
                value={progress[project._id] || ""}
                onChange={(e) =>
                  setProgress({ ...progress, [project._id]: e.target.value })
                }
                min="0"
                max="100"
              />
              <button onClick={() => handleProgressUpdate(project._id)}>
                Update Progress
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No projects assigned to you.</p>
      )}
    </div>
  );
};

export default CandidateDashboard;