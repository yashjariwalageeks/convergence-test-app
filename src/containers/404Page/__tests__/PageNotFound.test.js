import React from "react";
import {render, screen} from "@testing-library/react";
import PageNotFound from "../index";

describe('Page not found component', () => {
    it('It should render page', () => {
        render(<PageNotFound/>)
        expect(screen.getByText("404 Page not found")).toBeTruthy()
    });
})
