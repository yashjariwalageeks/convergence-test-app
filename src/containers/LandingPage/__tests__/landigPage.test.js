import React from "react";
import {MemoryRouter} from "react-router-dom"
import {fireEvent, render, screen} from "@testing-library/react";
import LandingPage from "../index";

describe('Landing page found component', () => {

    it('It should render New user button', () => {
        render(<LandingPage/>)
        expect(screen.getByText("New user")).toBeTruthy()
    });

    it('It should render Existing User button', () => {
        render(<LandingPage/>)
        expect(screen.getByText("Existing User")).toBeTruthy()
    });
})
