import { render, screen } from "@testing-library/react";
import React from "react";
import { MSThemeProvider } from "./MSThemeProvider.component";

test('should render properly', () => {
    render(<MSThemeProvider><h1>Test</h1></MSThemeProvider>);

    expect(screen.getByRole('heading')).toHaveTextContent('Test');
});

test('should have consumer-light as a default theme', () => {
    const theme = MSThemeProvider.defaultProps.theme;
    const mode = MSThemeProvider.defaultProps.mode;

    expect(theme).toBe('consumer');
    expect(mode).toBe('light');
});

