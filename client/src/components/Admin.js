import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([{ label: '', type: 'text' }]);

    const [forms, setForms] = useState([]);

    const navigate = useNavigate();
    const fetchForms = async () => {
        try {
            const response = await axios.get('/api/forms/all');
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms', error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const addField = () => {
        setFields([...fields, { label: '', type: 'text' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/forms/create', { title, fields });
            alert('Form created successfully');
            setTitle('');
            fetchForms();
        } catch (error) {
            console.error('Error creating form', error);
        }
    };

    const handleLabelChange = (e, index) => {
        const newFields = [...fields];
        newFields[index].label = e.target.value;
        setFields(newFields);
    };

    const handleTypeChange = (e, index) => {
        const newFields = [...fields];
        newFields[index].type = e.target.value;
        setFields(newFields);
    };

    const handleViewSubmissions = (id) => {
        navigate(`/admin/forms/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Admin: Create a Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Form Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter form title"
                    />
                </div>

                {fields.map((field, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700">Field {index + 1} Label</label>
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => handleLabelChange(e, index)}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Enter field label"
                        />

                        <label className="block text-gray-700">Field {index + 1} Type</label>
                        <select
                            value={field.type}
                            onChange={(e) => handleTypeChange(e, index)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="password">Password</option>
                            <option value="date">Date</option>
                            <option value="number">Number</option>
                        </select>
                    </div>
                ))}

                <button type="button" onClick={addField} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Add Field
                </button>

                <button type="submit" className="ml-4 px-4 py-2 bg-green-500 text-white rounded">
                    Create Form
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Created Forms</h2>
                <ul>
                    {forms.map((form) => (
                        <li key={form._id} className="mb-4 p-4 border rounded">
                            <h3 className="font-bold">{form.title}</h3>
                            <p>Submissions: {form.submissionCount}</p>
                            <button
                                onClick={() => handleViewSubmissions(form._id)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                View Submissions
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;


