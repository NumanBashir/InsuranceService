import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TextField from "../components/TextField";

describe("TextField component", () => {
  it("renders with label", () => {
    render(<TextField label="Name" name="name" value="" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(<TextField label="Name" name="name" value="John Doe" />);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  it("applies placeholder", () => {
    render(
      <TextField
        label="Name"
        name="name"
        value=""
        placeholder="Enter your name"
      />
    );
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("is read-only when specified", () => {
    render(<TextField label="Name" name="name" value="John Doe" readOnly />);
    const input = screen.getByDisplayValue("John Doe");
    expect(input).toHaveAttribute("readOnly");
    expect(input).toHaveClass("bg-gray-100 cursor-not-allowed");
  });

  it("calls onChange handler when value changes", () => {
    const handleChange = vi.fn();
    render(
      <TextField label="Name" name="name" value="" onChange={handleChange} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Jane Doe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("has default classes", () => {
    const { container } = render(
      <TextField label="Name" name="name" value="" />
    );
    expect(container?.firstChild?.firstChild).toHaveClass(
      "block text-gray-700 text-sm font-bold mb-2"
    );
    expect(container.firstChild?.lastChild).toHaveClass(
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    );
  });

  it("applies mb-4 and text-gray-500 class when readOnly", () => {
    const { container } = render(
      <TextField label="Name" name="name" value="John Doe" readOnly />
    );
    expect(container.firstChild).toHaveClass("mb-4 text-gray-500");
  });
});
