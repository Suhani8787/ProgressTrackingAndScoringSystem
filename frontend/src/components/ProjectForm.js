import React, { useState } from 'react';
import { addProject } from '../services/projectService';

function ProjectForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProject(formData);
            alert('Project added successfully!');
            setFormData({ title: '', description: '', assignedTo: '' });
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Project</h2>
            <label>Title:</label>
            <input name="title" value={formData.title} onChange={handleChange} required />

            <label>Description:</label>
            <input name="description" value={formData.description} onChange={handleChange} />

            <label>Assigned To:</label>
            <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} required />

            <button type="submit">Add Project</button>
        </form>
    );
}

export default ProjectForm;