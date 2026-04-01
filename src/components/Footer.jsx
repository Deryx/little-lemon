import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <section>
                <h3>Doormat<br />Navigation</h3>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/reservations">Reservations</Link>
                    </li>
                    <li>
                        <Link to="/order">Order Online</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Contact</h3>
                <p>123 Main Street<br />Chicago, IL 60601<br /><strong>Phone:</strong> (123) 456-7890<br /><strong>Email:</strong> info@littlelemon.com</p>
            </section>
            <section>
                <h3>Social Media Links</h3>
            </section>
        </footer>
    );
}

export default Footer;