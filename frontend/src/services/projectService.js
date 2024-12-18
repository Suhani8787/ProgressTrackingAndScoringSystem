import axios from 'axios';

const API_URL = 'http://localhost:5005/api/projects';

// Get all projects
export const getProjects = () => axios.get(API_URL);

// Add a new project
export const addProject = (data) => axios.post(API_URL, data);

// Update project progress
export const updateProject = (id, data) => axios.put(`${API_URL}/${id}`, data);