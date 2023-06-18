import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Channel from './Channel';
import { Router } from 'react-router';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => jest.fn(),
}))

describe('Channel page', () => {
    beforeAll(() => {
        require("../../firebase")
    })
    it('renders without errors', async () => {
        await act(async () => {
            render(<Router location="/"><Channel /></Router>);
        });

        expect(screen.getByTestId('channel')).toBeInTheDocument();
    });
});