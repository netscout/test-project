import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the Welcome component", () => {
    render(<App />);

    // Check that the Welcome component is rendered by looking for its content
    expect(screen.getByText("Welcome to Our Project")).toBeInTheDocument();
    expect(
      screen.getByText("Start building something amazing today")
    ).toBeInTheDocument();

    // Check for feature cards to ensure Welcome component is fully rendered
    expect(screen.getByText("Fast Development")).toBeInTheDocument();
    expect(screen.getByText("High Performance")).toBeInTheDocument();
    expect(screen.getByText("Beautiful Design")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Get Started" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Learn More" })
    ).toBeInTheDocument();
  });
});
