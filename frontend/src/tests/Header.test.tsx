import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(() => ({
    pathname: "/", // Default to root path for most tests
    state: null, // Default state is null unless specified in a test
  })),
}));

vi.mock("../hooks/useUserState", () => ({
  __esModule: true, // This is important for default exports
  default: () => ({
    userId: "123",
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Elm Street",
  }),
}));

describe("Header", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks to ensure clean state for each test
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/", // Adjusted based on test needs
      state: null, // Simulate different user states
      key: "",
      search: "",
      hash: "",
    });
  });

  it("redirects to /home when user is logged in", () => {
    // Mocking useLocation specifically for this test if needed
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/",
      state: {
        userId: "123",
        name: "John Doe",
        email: "johndoe@example.com",
        address: "123 Elm Street",
      },
      key: "",
      search: "",
      hash: "",
    });
    render(<Header />);
    fireEvent.click(screen.getByAltText("Home"));
    expect(mockNavigate).toHaveBeenCalledWith("/home", {
      state: {
        userId: "123",
        name: "John Doe",
        email: "johndoe@example.com",
        address: "123 Elm Street",
      },
    });
  });

  // Add more tests here for other conditions
});
