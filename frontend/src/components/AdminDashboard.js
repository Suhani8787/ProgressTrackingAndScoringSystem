import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);  // Store the list of registered users
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        candidateName: '',  // Candidate name will be set from the dropdown
    });

    // Fetch all candidate projects
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5005/api/projects/candidates');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Fetch all registered users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5005/api/auth/users');  // Update with the correct endpoint
            setUsers(response.data);  // Store users in the state
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchUsers();  // Fetch users when the component mounts
    }, []);

    // Assign a project
    const assignProject = async () => {
        try {
            await axios.post('http://localhost:5005/api/projects/assign', newProject);
            setNewProject({ title: '', description: '', candidateName: '' });
            fetchProjects();  // Refresh project list
        } catch (error) {
            console.error('Error assigning project:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {/* Assign Project Form */}
            <div>
                <h2>Assign a Project</h2>
                <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />

                {/* Candidate Name Dropdown */}
                <select
                    value={newProject.candidateName}
                    onChange={(e) => setNewProject({ ...newProject, candidateName: e.target.value })}
                >
                    <option value="">Select Candidate</option>
                    {users.map((user) => (
                        <option key={user._id} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <button onClick={assignProject}>Assign Project</button>
            </div>

            {/* Display Candidate Projects */}
            <div>
                <h2>Candidate Projects</h2>
                {projects.length === 0 ? (
                    <p>No projects assigned yet</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} style={{ border: '1px solid gray', padding: '10px' }}>
                            <h3>{project.title} (Assigned to: {project.candidateName})</h3>
                            <p>Description: {project.description}</p>
                            <p>Progress: {project.progress}%</p>
                            <p>Status: {project.status}</p>
                            <p>Score: {project.score}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;