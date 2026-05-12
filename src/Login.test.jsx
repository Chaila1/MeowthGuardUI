import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { describe, it, expect } from "vitest";

describe('Login UI', () => {
    it('Loads up the login page and its features correctly', () => {
        render(<BrowserRouter><Login /></BrowserRouter>);

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Please enter your username or email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Please enter your password')).toBeInTheDocument();
    });

    it('updates when the user starts typing', () => {
        render(<BrowserRouter><Login /></BrowserRouter>);

        const userInput = screen.getByPlaceholderText('Please enter your username or email');
        fireEvent.change(userInput, { target: { value: 'mattyb' } });
        expect(userInput.value).toBe('mattyb');
    });
});