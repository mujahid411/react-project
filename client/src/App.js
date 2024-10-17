import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import User from './pages/User';
import FormSubmissions from './pages/FormSubmissions';

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin/forms/:id" element={<FormSubmissions />} />
      </Routes>
    </div>
  </Router>
);

export default App;

