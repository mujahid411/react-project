import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [forms, setForms] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('/api/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms', error);
            }
        };

        fetchForms();
    }, []);

    const handleSubmit = async (formId) => {
        try {
            await axios.post(`/api/forms/submit/${formId}`, formData);
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold">User: Submit Forms</h1>
            {forms.map((form) => (
                <div key={form._id} className="mb-6">
                    <h2 className="text-lg font-semibold">{form.title}</h2>
                    {form.fields.map((field, index) => (
                        <div key={index} className="mb-2">
                            <label className="block text-gray-700">{field.label}</label>
                            <input
                                type={field.type}
                                onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => handleSubmit(form._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default User;
