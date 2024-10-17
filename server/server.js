import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/forms.js';
import './dbConnect.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
