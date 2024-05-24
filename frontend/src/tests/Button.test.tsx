import Button from "../components/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Button component", () => {
  it("renders with text", () => {
    render(<Button text="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <Button text="Click me" className="custom-class" onClick={() => {}} />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has default classes", () => {
    const { container } = render(<Button text="Click me" onClick={() => {}} />);
    expect(container.firstChild).toHaveClass(
      "px-4 py-1 border rounded focus:outline-none"
    );
  });
});
