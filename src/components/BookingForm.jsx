import React, { useState } from 'react';
import { submitAPI } from '../api';

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

    const validateForm = () => {
        if (formData.firstName === '') {
            setErrors(prev => ({ ...prev, firstName: 'First name is required' }));
        }
        if (formData.lastName === '') {
            setErrors(prev => ({ ...prev, lastName: 'Last name is required' }));
        }
        if (formData.email === '') {
            setErrors(prev => ({ ...prev, email: 'First name is required' }));
        }
        if (!formData.email.includes('@')) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
        }
        if (formData.phone === '') {
            setErrors(prev => ({ ...prev, phone: 'A phone number is required' }));
        }
        if (formData.date === '') {
            setErrors(prev => ({ ...prev, date: 'A date is required' }));
        }
        if (formData.time === '') {
            setErrors(prev => ({ ...prev, time: 'A time is required' }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        validateForm();
        if (Object.keys(errors).length === 0) {
            submitAPI(formData);
        }
    };

    return (
        <form>
            <div>
                <label htmlFor='firstName'>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
            </div>
            {errors.firstName && <div className='error'><label></label>{errors.firstName}</div>}

            <div>
                <label htmlFor='lastName'>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
            </div>
            {errors.lastName && <div className='error'><label></label>{errors.lastName}</div>}
            
            <div>
                <label htmlFor='phone'>Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            {errors.phone && <div className='error'><label></label>{errors.phone}</div>}
            
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            {errors.email && <div className='error'><label></label>{errors.email}</div>}
            
            <div>
                <label htmlFor='date'>Date:</label>
                <input
                    type="res-date"
                    name="res-date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </div>
            {errors.date && <div className='error'><label></label>{errors.date}</div>}
            
            <div>
                <label htmlFor='time'>Time:</label>
                <select
                    id="res-time"
                    name="res-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
            {errors.time && <div className='error'><label></label>{errors.time}</div>}
            
            <div>
                <label htmlFor='guests'>Guests:</label>
                <input
                    type="number"
                    name="guests"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                />
            </div>
            {errors.guests && <div><label></label>{errors.guests}</div>}
            
            <div>
                <label htmlFor='occasion'>Occasion:</label>
                <select id="occasion">
                    <option>Birthday</option>
                    <option>Engagement</option>
                    <option>Anniversary</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <button
                    type="submit"
                    aria-label='On Click'
                    onClick={handleSubmit}
                >
                    Make Your reservation
                </button>
            </div>
        </form>
    );
};

export default BookingForm;