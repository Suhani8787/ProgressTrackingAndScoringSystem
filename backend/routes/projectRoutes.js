const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Assuming you have a Project model

// Assign a new project (Admin functionality)
// POST /api/projects/assign
router.post('/assign', async (req, res) => {
    const { title, description, candidateName } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            candidateName,
            progress: 0,
            status: "Pending",
            score: 0,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch all projects (Admin functionality)
// GET /api/projects/candidates
router.get('/candidates', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch projects assigned to a candidate (Candidate functionality)
// GET /api/projects/:candidateName
router.get('/:candidateName', async (req, res) => {
    const { candidateName } = req.params;

    try {
        const projects = await Project.find({ candidateName });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Accept a project (Candidate functionality)
// PUT /api/projects/:id/accept
router.put('/:id/accept', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.status = "Accepted";
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update project progress (Candidate functionality)
// PUT /api/projects/:id
router.put('/:id', async (req, res) => {
    try {
        const { progress } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.progress = progress;
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;