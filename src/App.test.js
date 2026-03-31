// App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('./components/Header', () => () => <header data-testid="header" />);
jest.mock('./components/Main',   () => () => <main   data-testid="main"   />);
jest.mock('./components/Footer', () => () => <footer data-testid="footer" />);

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('App', () => {
    beforeEach(() => render(<App />));

    it('renders the Header component', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders the Main component', () => {
        expect(screen.getByTestId('main')).toBeInTheDocument();
    });

    it('renders the Footer component', () => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders all three components exactly once', () => {
        expect(screen.getAllByTestId(/header|main|footer/)).toHaveLength(3);
    });
});

// ─── Document structure ───────────────────────────────────────────────────────

describe('App — document structure', () => {
    it('renders Header before Main', () => {
        const { container } = render(<App />);
        const [header, main] = [
            container.querySelector('[data-testid="header"]'),
            container.querySelector('[data-testid="main"]'),
        ];

        expect(
            header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();
    });

    it('renders Main before Footer', () => {
        const { container } = render(<App />);
        const [main, footer] = [
            container.querySelector('[data-testid="main"]'),
            container.querySelector('[data-testid="footer"]'),
        ];

        expect(
            main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();
    });

    it('renders without a wrapping DOM element (fragment)', () => {
        const { container } = render(<App />);
        // A fragment renders its children directly into the container <div>.
        // If a wrapper element were added, childElementCount would be 1.
        expect(container.childElementCount).toBe(3);
    });
});