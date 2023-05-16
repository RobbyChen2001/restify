import './App.css';
import React from 'react';

import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';

import Notification from './Pages/Notification';
import Profile from './Pages/Profile';
import PropertyDetails from './Pages/PropertyDetails';
import Reservations from './Pages/Reservations';

import HostComments from './Pages/HostComments';
import PropertyHost from './Pages/PropertyHost';
import RateUser from './Pages/RateUser';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
   
    <Router>
      
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/notification" element={<Notification />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/properties/:property_id" element={<PropertyDetails />} />
        <Route exact path="/reservations" element={<Reservations />} />
        <Route exact path="/hostcomments" element={<HostComments />} />
        <Route exact path="/propertyhost" element={<PropertyHost />} />
        <Route exact path="/rateuser" element={<RateUser />} />
      </Routes>
    </Router>
  );
}


export default App;
