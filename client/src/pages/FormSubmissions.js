import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormSubmissions = () => {
    const { id } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [formTitle, setFormTitle] = useState('');

    // Fetch the form submissions
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`/api/forms/${id}/submissions`);
                setFormTitle(response.data.title);
                setSubmissions(response.data.submissions);
            } catch (error) {
                console.error('Error fetching submissions', error);
            }
        };

        fetchSubmissions();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Submissions for: {formTitle}</h1>

            {submissions.length > 0 ? (
                <ul>
                    {submissions.map((submission, index) => (
                        <li key={index} className="mb-4 p-4 border rounded">
                            <h3 className="font-bold">Submission {index + 1}</h3>
                            <pre className="whitespace-pre-wrap">{JSON.stringify(submission, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No submissions yet.</p>
            )}
        </div>
    );
};

export default FormSubmissions;
