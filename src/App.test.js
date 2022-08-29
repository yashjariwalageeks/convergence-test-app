import React from "react";
import {MemoryRouter} from "react-router-dom"
import {fireEvent, render, screen} from "@testing-library/react";
import App from "./App";

describe('Landing page found component', () => {

    it('It should render Landing Page', () => {
        render(<MemoryRouter><App/></MemoryRouter>)
        expect(screen.getByText("New user")).toBeTruthy()
        expect(screen.getByText("Existing User")).toBeTruthy()
    });

    it('It should go to log in page', () => {
        render(<MemoryRouter><App/></MemoryRouter>)
        const ExistingUserButton = screen.getByText("Existing User")
        fireEvent.click(ExistingUserButton)
        expect(screen.queryAllByText("Log in")).toHaveLength(2)
    });

    it('It should go to Sign up page', () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        const NewUserButton = screen.getByText("New user");
        fireEvent.click(NewUserButton)
        expect(screen.getByText("Registration")).toBeTruthy()
    });

})
