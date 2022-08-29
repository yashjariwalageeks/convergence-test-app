import {fireEvent, render, screen} from "@testing-library/react";
import LoginPage from "../index";
import React from "react";

describe('Login page component', () => {

    it('It should render login page', () => {
        render(<LoginPage/>);
        expect(screen.queryAllByText("Log in")).toBeTruthy()
    });

    it('It should change the email input field', () => {
        render(<LoginPage/>)
        const emailInput = screen.getByPlaceholderText('Enter your email');
        expect(emailInput).toHaveValue("")
        fireEvent.change(emailInput, {target: {name: "email", value: "test@gmail.com"}})
        expect(emailInput).toHaveValue("test@gmail.com")
    });

    it('It should change the password input field', () => {
        render(<LoginPage/>)
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        expect(passwordInput).toHaveValue("")
        fireEvent.change(passwordInput, {target: {name: "password", value: "as123456"}})
        expect(passwordInput).toHaveValue("as123456")
    });

    it('It should validate email input field', () => {
        render(<LoginPage/>)
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const signUpButton = screen.getByRole('button');
        // should have required field message
        expect(emailInput).toHaveValue("")
        fireEvent.click(signUpButton);
        expect(screen.getByText("Email is required field.")).toBeTruthy();

        // should have invalid email message
        fireEvent.change(emailInput, {target: {name: "email", value: "test"}})
        fireEvent.click(signUpButton);
        expect(screen.getByText("Please enter a valid email.")).toBeTruthy();

        // should not have any error message for email field
        fireEvent.change(emailInput, {target: {name: "email", value: "test@gmail.com"}})
        fireEvent.click(signUpButton);
        expect(screen.queryByText("Please enter a valid email.")).not.toBeTruthy();
    });

    it('It should validate password input field', () => {
        render(<LoginPage/>)
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const signUpButton = screen.getByRole('button');
        // should have required field message
        expect(passwordInput).toHaveValue("")
        fireEvent.click(signUpButton);
        expect(screen.getByText(/^Password is required field./, {exact: false})).toBeTruthy();

        //should not have ann error message
        fireEvent.change(passwordInput, {target: {name: "password", value: "as123456"}})
        fireEvent.click(signUpButton);
        expect(screen.queryByText(/^Password is required field./, {exact: false})).not.toBeTruthy();
    });
})
