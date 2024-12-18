import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5005/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Accept a project
    const acceptProject = async (id) => {
        try {
            await axios.put(`http://localhost:5005/api/projects/${id}/accept`);
            fetchProjects(); // Refresh list
        } catch (error) {
            console.error("Error accepting project:", error);
        }
    };

    // Update progress
    const updateProgress = async (id, progress) => {
        try {
            await axios.put(`http://localhost:5005/api/projects/${id}`, { progress });
            fetchProjects(); // Refresh list
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    return (
        <div>
            <h1>Project Assignment List</h1>
            {projects.length === 0 ? (
                <p>No projects available</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li key={project._id} style={{ marginBottom: '20px' }}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Status: {project.status}</p>
                            <p>Progress: {project.progress}%</p>
                            <p>Score: {project.score}</p>
                            
                            {/* Accept Button */}
                            {project.status === "Pending" && (
                                <button onClick={() => acceptProject(project._id)}>Accept</button>
                            )}

                            {/* Progress Slider */}
                            <div>
                                <label>Update Progress: </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={project.progress}
                                    onChange={(e) => updateProgress(project._id, e.target.value)}
                                />
                                <span>{project.progress}%</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;