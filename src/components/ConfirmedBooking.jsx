import React from 'react';

const ConfirmedBooking = ({ formData }) => {
    return (
        <div>
            <h1>Confirmed Booking</h1>
            <p>Your booking has been confirmed with the following details:</p>
            <p>Name: {formData.firstName} {formData.lastName}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Date: {formData.date}</p>
            <p>Time: {formData.time}</p>
            <p>Guests: {formData.guests}</p>
            <p>Occasion: {formData.occasion}</p>
        </div>
    );
};

export default ConfirmedBooking;