import { render, screen } from "@testing-library/react";
import React from "react";
import { MSThemeInverter } from "./MSThemeInverter.component";

test('should render properly', () => {
    render(<MSThemeInverter><h1>Test</h1></MSThemeInverter>);

    expect(screen.getByRole('heading')).toHaveTextContent('Test');
});

test('should have a default theme', () => {
    const mode = MSThemeInverter.defaultProps.theme.attributes.mode;
    const theme = MSThemeInverter.defaultProps.theme.attributes.theme;

    expect(mode).toBe('light');
    expect(theme).toBe('consumer');
});

