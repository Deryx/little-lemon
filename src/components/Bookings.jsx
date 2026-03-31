import React, { useReducer } from 'react';
import BookingForm from './BookingForm';
import { fetchAPI } from '../api';

const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            // Return different times based on the selected date.
            // Replace this with real date-based logic as needed.
            return action.payload ?? state;
        default:
            return state;
    }
};

const initializeTimes = () => {
    const availableTimes = fetchAPI(new Date());

    return availableTimes;
};


const Bookings = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

    const handleDateChange = (date) => {
        const newTimes = window.fetchAPI(new Date(date));
        dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
    };

    return (
        <main>
            <BookingForm
                availableTimes={availableTimes}
                onDateChange={handleDateChange}
            />
        </main>
    );
};

export default Bookings;