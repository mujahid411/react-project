import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, fields } = req.body;
        const newForm = new Form({ title, fields });
        await newForm.save();
        res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/submit/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });

        form.submissions.push(req.body); // Add the submission data
        form.submissionCount += 1; // Increment submission count
        await form.save();

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/count/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });

        res.status(200).json({ submissionCount: form.submissionCount });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all forms with submission counts
router.get('/all', async (req, res) => {
    try {
        const forms = await Form.find({}, 'title submissionCount');
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get submissions for a specific form
router.get('/:id/submissions', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id, 'title submissions');
        if (!form) return res.status(404).json({ error: 'Form not found' });

        res.status(200).json({ title: form.title, submissions: form.submissions });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


export default router;
