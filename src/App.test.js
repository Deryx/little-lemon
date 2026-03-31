// Bookings.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// ─── Bookings rendering ───────────────────────────────────────────────────────

describe('Bookings rendering', () => {
    beforeEach(() => setupMocks());

    it('renders a <main> element', () => {
        const { container } = render(<Bookings />);
        expect(container.querySelector('main')).toBeInTheDocument();
    });

    it('renders the BookingForm component', () => {
        render(<Bookings />);
        expect(screen.getByTestId('booking-form')).toBeInTheDocument();
    });

    it('passes availableTimes to BookingForm', () => {
        setupMocks({ moduleReturn: DEFAULT_TIMES });
        render(<Bookings />);

        expect(screen.getAllByTestId('time-option')).toHaveLength(DEFAULT_TIMES.length);
    });

    it('passes an onDateChange handler to BookingForm', () => {
        render(<Bookings />);

        // The mock BookingForm renders a button that calls onDateChange —
        // if it were undefined this would throw.
        expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
    });
});

// ─── handleDateChange ─────────────────────────────────────────────────────────

describe('handleDateChange', () => {
    beforeEach(() => setupMocks());

    it('calls window.fetchAPI when the date changes', () => {
        render(<Bookings />);
        fireEvent.click(screen.getByRole('button', { name: /change date/i }));

        expect(window.fetchAPI).toHaveBeenCalledTimes(1);
    });

    it('calls window.fetchAPI with a Date object', () => {
        render(<Bookings />);
        fireEvent.click(screen.getByRole('button', { name: /change date/i }));

        const calledWith = window.fetchAPI.mock.calls[0][0];
        expect(calledWith).toBeInstanceOf(Date);
    });

    it('calls window.fetchAPI with the correct date value', () => {
        render(<Bookings />);
        fireEvent.click(screen.getByRole('button', { name: /change date/i }));

        const calledWith = window.fetchAPI.mock.calls[0][0];
        // Mock BookingForm fires onDateChange('2024-06-15')
        expect(calledWith.toISOString().startsWith('2024-06-15')).toBe(true);
    });

    it('updates availableTimes in BookingForm after a date change', () => {
        setupMocks({ moduleReturn: DEFAULT_TIMES, windowReturn: UPDATED_TIMES });
        render(<Bookings />);

        // Before change
        expect(screen.getAllByTestId('time-option')).toHaveLength(DEFAULT_TIMES.length);

        fireEvent.click(screen.getByRole('button', { name: /change date/i }));

        // After change
        const items = screen.getAllByTestId('time-option');
        expect(items).toHaveLength(UPDATED_TIMES.length);
        items.forEach((item, i) => expect(item).toHaveTextContent(UPDATED_TIMES[i]));
    });

    it('keeps the previous times when window.fetchAPI returns null', () => {
        setupMocks({ moduleReturn: DEFAULT_TIMES, windowReturn: null });
        render(<Bookings />);

        fireEvent.click(screen.getByRole('button', { name: /change date/i }));

        // payload is null → ?? falls back to current state
        expect(screen.getAllByTestId('time-option')).toHaveLength(DEFAULT_TIMES.length);
    });
});