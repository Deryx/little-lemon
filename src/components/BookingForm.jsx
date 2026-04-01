import React, { useState } from 'react';
import { submitAPI } from '../api';
import ConfirmedBooking from './ConfirmedBooking';

const BookingForm = ({ availableTimes, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 1,
        occasion: ''
    });

    const [errors, setErrors] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (formData.firstName === '') newErrors.firstName = 'First name is required';
        if (formData.lastName === '') newErrors.lastName = 'Last name is required';
        if (formData.email === '') {
            newErrors.email = 'Email is required';
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email';
        }
        if (formData.phone === '') newErrors.phone = 'A phone number is required';
        if (formData.date === '') newErrors.date = 'A date is required';
        if (formData.time === '') newErrors.time = 'A time is required';

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            submitAPI(formData);
            setShowConfirmation(true);
        }
    };

    return (
        <>
            {showConfirmation && <ConfirmedBooking formData={formData} />}
            {!showConfirmation &&
                <form onSubmit={handleSubmit}>
                    <h1>Reservations</h1>

                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    {errors.firstName && <div className='error'><label></label>{errors.firstName}</div>}

                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                    {errors.lastName && <div className='error'><label></label>{errors.lastName}</div>}

                    <div>
                        <label htmlFor='phone'>Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    {errors.phone && <div className='error'><label></label>{errors.phone}</div>}

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    {errors.email && <div className='error'><label></label>{errors.email}</div>}

                    <div>
                        <label htmlFor='date'>Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    {errors.date && <div className='error'><label></label>{errors.date}</div>}

                    <div>
                        <label htmlFor='time'>Time:</label>
                        <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        >
                            <option value=''>-- Select a time --</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    {errors.time && <div className='error'><label></label>{errors.time}</div>}

                    <div>
                        <label htmlFor='guests'>Guests:</label>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            min="1"
                            max="10"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                        />
                    </div>
                    {errors.guests && <div className='error'><label></label>{errors.guests}</div>}

                    <div>
                        <label htmlFor='occasion'>Occasion:</label>
                        <select
                            id="occasion"
                            name="occasion"
                            value={formData.occasion}
                            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        >
                            <option value=''>-- Select an occasion --</option>
                            <option value='Birthday'>Birthday</option>
                            <option value='Engagement'>Engagement</option>
                            <option value='Anniversary'>Anniversary</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" aria-label='Submit reservation'>
                            Make Your Reservation
                        </button>
                    </div>
                </form>
            }
        </>
    );
};

export default BookingForm;