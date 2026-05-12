import { render, screen } from "@testing-library/react";
import Scanner from "./Scanner";
import { describe, it, expect, vi } from "vitest";

global.URL.createObjectURL = vi.fn()

describe('Scanner UI', () => {
    it('loads the upload button when you are about to upload a card', () => {
        render(<Scanner/>);
        expect(screen.getByText('Click here to upload your image for verification')).toBeInTheDocument();
        expect(screen.getByText('Upload Image')).toBeInTheDocument();
    });
});