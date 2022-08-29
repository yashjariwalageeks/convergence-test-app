import React from "react";
import {render, screen} from "@testing-library/react";
import HomePage from "../index";

describe('Home page component', () => {

    it('It should render home page', () => {
        render(<HomePage/>)
        expect(screen.getByText("Home")).toBeTruthy()
    });

    it('It should have log out button', () => {
        render(<HomePage/>)
        expect(screen.queryAllByText("Log out")).toHaveLength(1)
    });

    it('It should render 5 article card component', () => {
        render(<HomePage/>)
        expect(screen.queryAllByRole("article")).toHaveLength(5)
    });
})
