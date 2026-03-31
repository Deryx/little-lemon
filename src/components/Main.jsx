import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Bookings from './Bookings';
import Home from './Home';
import About from './About';
import Menu from './Menu';
import OrderOnline from './OrderOnline';
import Login from './Login';

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<Bookings />} />
                <Route path="/order" element={<OrderOnline />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    );
};

export default Main;