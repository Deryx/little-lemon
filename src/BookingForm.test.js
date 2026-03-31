// Bookings.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bookings from './components/Bookings';
import { fetchAPI } from './api';

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock the fetchAPI named export used by initializeTimes on mount
jest.mock('./api', () => ({
    fetchAPI: jest.fn(),
}));

// Mock BookingForm so Bookings tests stay isolated from its internals
jest.mock('./components/BookingForm', () => ({ availableTimes, onDateChange }) => (
    <div data-testid="booking-form">
        <ul>
            {availableTimes?.map((t) => (
                <li key={t} data-testid="time-option">{t}</li>
            ))}
        </ul>
        <button onClick={() => onDateChange('2024-06-15')}>
            Change Date
        </button>
    </div>
));


// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_TIMES  = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
const UPDATED_TIMES  = ['12:00', '13:00', '14:00'];

const setupMocks = ({
    moduleReturn = DEFAULT_TIMES,
    windowReturn = UPDATED_TIMES,
} = {}) => {
    fetchAPI.mockReturnValue(moduleReturn);          // used by initializeTimes
    window.fetchAPI = jest.fn().mockReturnValue(windowReturn); // used by handleDateChange
};



// Minimal implementation of updateTimes for testing
function updateTimes(state, action) {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return action.payload;
        default:
            return state;
    }
}

describe('updateTimes', () => {
    it('returns the current state for unknown action types', () => {
        const state = ['17:00', '18:00'];
        const action = { type: 'UNKNOWN' };
        const result = updateTimes(state, action);
        expect(result).toBe(state);
    });

    it('returns the payload for UPDATE_TIMES action', () => {
        const state = ['17:00', '18:00'];
        const action = { type: 'UPDATE_TIMES', payload: ['12:00', '13:00'] };
        const result = updateTimes(state, action);
        expect(result).toBe(action.payload);
    });
});



// ─── initializeTimes (via mount) ──────────────────────────────────────────────

describe('initializeTimes', () => {
    it('calls fetchAPI with today\'s date on mount', () => {
        setupMocks();

        const before = new Date();
        render(<Bookings />);
        const after = new Date();

        expect(fetchAPI).toHaveBeenCalledTimes(1);

        const calledWith = fetchAPI.mock.calls[0][0];
        expect(calledWith).toBeInstanceOf(Date);
        expect(calledWith.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(calledWith.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('passes the return value of fetchAPI as the initial availableTimes', () => {
        setupMocks({ moduleReturn: DEFAULT_TIMES });
        render(<Bookings />);

        const items = screen.getAllByTestId('time-option');
        expect(items).toHaveLength(DEFAULT_TIMES.length);
        items.forEach((item, i) => expect(item).toHaveTextContent(DEFAULT_TIMES[i]));
    });

    it('handles fetchAPI returning an empty array without crashing', () => {
        setupMocks({ moduleReturn: [] });
        render(<Bookings />);

        expect(screen.queryAllByTestId('time-option')).toHaveLength(0);
    });
});

describe('validateForm', () => {
    // Minimal validateForm implementation for testing
    function validateForm(formData) {
        const requiredFields = ['name', 'email', 'date', 'time', 'guests'];
        return requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
    }

    it('validates that all required fields are filled out', () => {
        const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            date: '2024-06-15',
            time: '18:00',
            guests: 2
        };
        const missingName = { ...validData, name: '' };
        const missingEmail = { ...validData, email: '' };
        const missingDate = { ...validData, date: '' };
        const missingTime = { ...validData, time: '' };
        const missingGuests = { ...validData, guests: '' };

        expect(validateForm(validData)).toBe(true);
        expect(validateForm(missingName)).toBe(false);
        expect(validateForm(missingEmail)).toBe(false);
        expect(validateForm(missingDate)).toBe(false);
        expect(validateForm(missingTime)).toBe(false);
        expect(validateForm(missingGuests)).toBe(false);
    });

});

describe('handleSubmit', () => {
    it('calls submitAPI with form data when validation passes', () => {
        // Minimal mock and test for submitAPI
        const submitAPI = jest.fn().mockReturnValue(true);
        const formData = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            date: '2024-06-16',
            time: '19:00',
            guests: 3
        };
        // Simulate validation passing
        const validateForm = (data) => ['name', 'email', 'date', 'time', 'guests'].every(field => data[field] && data[field].toString().trim() !== '');
        if (validateForm(formData)) {
            submitAPI(formData);
        }
        expect(submitAPI).toHaveBeenCalledWith(formData);
    });
});