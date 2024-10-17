import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fields: { type: Array, required: true },  // Store form fields like [{label: 'Name', type: 'text'}]
    submissions: { type: Array, default: [] }, // Store form submissions
    submissionCount: { type: Number, default: 0 }, // Track how many times the form is submitted
});

const Form = mongoose.model('Form', formSchema);

export default Form;
