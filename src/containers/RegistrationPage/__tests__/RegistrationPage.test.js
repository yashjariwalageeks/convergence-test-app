import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import RegistrationPage from "../index";

describe('Registration page component', () => {

    it('It should render registration page', () => {
        render(<RegistrationPage/>)
        expect(screen.getByText("Registration")).toBeTruthy()
    });

    it('It should change the email input field', () => {
        render(<RegistrationPage/>)
        const emailInput = screen.getByPlaceholderText('Please enter your email');
        expect(emailInput).toHaveValue("")
        fireEvent.change(emailInput, {target: {name: "email", value: "test@gmail.com"}})
        expect(emailInput).toHaveValue("test@gmail.com")
    });

    it('It should change the password input field', () => {
        render(<RegistrationPage/>)
        const passwordInput = screen.getByPlaceholderText('Please enter your password');
        expect(passwordInput).toHaveValue("")
        fireEvent.change(passwordInput, {target: {name: "password", value: "as123456"}})
        expect(passwordInput).toHaveValue("as123456")
    });

    it('It should change confirm password input field', () => {
        render(<RegistrationPage/>)
        const confirmPasswordInput = screen.getByPlaceholderText('Please re-enter your password');
        expect(confirmPasswordInput).toHaveValue("")
        fireEvent.change(confirmPasswordInput, {target: {name: "confirmPassword", value: "as123456"}})
        expect(confirmPasswordInput).toHaveValue("as123456")
    });

    it('It should change gender input field', () => {
        render(<RegistrationPage/>)
        const maleLabelRadio = screen.getByLabelText('Male');
        const femaleLabelRadio = screen.getByLabelText('Female');
        const otherLabelRadio = screen.getByLabelText('Other');

        //Male radio button clicked
        expect(maleLabelRadio.checked).toEqual(false);
        expect(femaleLabelRadio.checked).toEqual(false);
        expect(otherLabelRadio.checked).toEqual(false);
        fireEvent.click(maleLabelRadio);
        expect(maleLabelRadio.checked).toEqual(true)
        expect(femaleLabelRadio.checked).toEqual(false);
        expect(otherLabelRadio.checked).toEqual(false);

        //Female radio button clicked
        expect(maleLabelRadio.checked).toEqual(true);
        expect(femaleLabelRadio.checked).toEqual(false);
        expect(otherLabelRadio.checked).toEqual(false);
        fireEvent.click(femaleLabelRadio);
        expect(maleLabelRadio.checked).toEqual(false)
        expect(femaleLabelRadio.checked).toEqual(true);
        expect(otherLabelRadio.checked).toEqual(false);

        //Other radio button clicked
        expect(maleLabelRadio.checked).toEqual(false);
        expect(femaleLabelRadio.checked).toEqual(true);
        expect(otherLabelRadio.checked).toEqual(false);
        fireEvent.click(otherLabelRadio);
        expect(maleLabelRadio.checked).toEqual(false)
        expect(femaleLabelRadio.checked).toEqual(false);
        expect(otherLabelRadio.checked).toEqual(true);
    });

    it('It should validate email input field', () => {
        render(<RegistrationPage/>)
        const emailInput = screen.getByPlaceholderText('Please enter your email');
        const signUpButton = screen.getByText('Sign up');
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
        render(<RegistrationPage/>)
        const passwordInput = screen.getByPlaceholderText('Please enter your password');
        const signUpButton = screen.getByText('Sign up');
        // should have required field message
        expect(passwordInput).toHaveValue("")
        fireEvent.click(signUpButton);
        expect(screen.getByText(/^Password is required field./, {exact: false})).toBeTruthy();

        // should have invalid password length message
        fireEvent.change(passwordInput, {target: {name: "password", value: "1234"}})
        fireEvent.click(signUpButton);
        expect(screen.getByText("Password length should be between 6-12 characters.", {exact: false})).toBeTruthy();

        // should have minimum 2 alphabets message
        fireEvent.change(passwordInput, {target: {name: "password", value: "123456"}})
        fireEvent.click(signUpButton);
        expect(screen.getByText("Password should contain minimum 2 alphabets.", {exact: false})).toBeTruthy();

        //should not have ann error message
        fireEvent.change(passwordInput, {target: {name: "password", value: "as123456"}})
        fireEvent.click(signUpButton);
        expect(screen.queryByText("Password should contain minimum 2 alphabets.", {exact: false})).not.toBeTruthy();
    });

    it('It should validate confirm password input field', () => {
        render(<RegistrationPage/>)
        const passwordInput = screen.getByPlaceholderText('Please enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Please re-enter your password');
        const signUpButton = screen.getByText('Sign up');

        // should have required field message
        expect(confirmPasswordInput).toHaveValue("")
        fireEvent.click(signUpButton);
        expect(screen.getByText('Confirm password is required field.', {exact: false})).toBeTruthy();

        // should have "Password do not match." error message
        fireEvent.change(passwordInput, {target: {name: "password", value: "as123456"}})
        fireEvent.change(confirmPasswordInput, {target: {name: "confirmPassword", value: "123456"}})
        fireEvent.click(signUpButton);
        expect(screen.getByText("Password do not match.", {exact: false})).toBeTruthy();

        //should not have any error message
        fireEvent.change(confirmPasswordInput, {target: {name: "confirmPassword", value: "as123456"}})
        fireEvent.click(signUpButton);
        expect(screen.queryByText("Password do not match.", {exact: false})).not.toBeTruthy();
    });

    it('It should validate gender input field', () => {
        render(<RegistrationPage/>)
        const maleLabelRadio = screen.getByLabelText('Male');
        const signUpButton = screen.getByText('Sign up');

        // should have required field message
        fireEvent.click(signUpButton);
        expect(screen.getByText("Gender is required field.")).toBeTruthy();

        fireEvent.click(maleLabelRadio);
        fireEvent.click(signUpButton);
        expect(screen.queryByText("Gender is required field.")).not.toBeTruthy();

    });
})