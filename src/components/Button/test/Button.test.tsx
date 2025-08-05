import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("btn", "btn--primary", "btn--medium");
      expect(button).not.toBeDisabled();
    });

    it("renders children content correctly", () => {
      render(<Button>Test Button Content</Button>);

      expect(screen.getByText("Test Button Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("forwards HTML button props", () => {
      render(
        <Button id="test-button" data-testid="custom-button" title="Test Title">
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "test-button");
      expect(button).toHaveAttribute("data-testid", "custom-button");
      expect(button).toHaveAttribute("title", "Test Title");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--primary");
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--secondary");
    });

    it("renders danger variant", () => {
      render(<Button variant="danger">Danger</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--danger");
    });

    it("renders outline variant", () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--outline");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Button size="small">Small</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--small");
    });

    it("renders medium size (default)", () => {
      render(<Button>Medium</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--medium");
    });

    it("renders large size", () => {
      render(<Button size="large">Large</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--large");
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("renders loading state", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--loading");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
    });

    it("shows loading spinner when loading", () => {
      render(<Button loading>Loading Button</Button>);

      const spinner = screen.getByTestId("button-spinner");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-hidden", "true");
    });

    it("hides content icons when loading", () => {
      render(
        <Button
          loading
          leftIcon={<span>Left</span>}
          rightIcon={<span>Right</span>}
        >
          Loading
        </Button>
      );

      // Icons should not be visible when loading
      expect(screen.queryByText("Left")).not.toBeInTheDocument();
      expect(screen.queryByText("Right")).not.toBeInTheDocument();
    });
  });

  describe("Full Width", () => {
    it("applies full width class when fullWidth is true", () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn--full-width");
    });

    it("does not apply full width class by default", () => {
      render(<Button>Normal Width</Button>);

      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("btn--full-width");
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      const leftIcon = <span data-testid="left-icon">👈</span>;
      render(<Button leftIcon={leftIcon}>With Left Icon</Button>);

      const icon = screen.getByTestId("left-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.parentElement).toHaveClass("btn__icon", "btn__icon--left");
      expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");
    });

    it("renders right icon", () => {
      const rightIcon = <span data-testid="right-icon">👉</span>;
      render(<Button rightIcon={rightIcon}>With Right Icon</Button>);

      const icon = screen.getByTestId("right-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.parentElement).toHaveClass("btn__icon", "btn__icon--right");
      expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");
    });

    it("renders both left and right icons", () => {
      const leftIcon = <span data-testid="left-icon">👈</span>;
      const rightIcon = <span data-testid="right-icon">👉</span>;

      render(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Both Icons
        </Button>
      );

      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("does not render icon containers when no icons provided", () => {
      render(<Button>No Icons</Button>);

      expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
      expect(document.querySelector(".btn__icon")).not.toBeInTheDocument();
    });
  });

  describe("Click Handling", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Clickable</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("works with fireEvent", () => {
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Fire Event</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents default when disabled and clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("prevents default when loading and clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has correct aria attributes when loading", () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("aria-label", "Loading Button - Loading");
    });

    it("uses custom aria-label when provided", () => {
      render(<Button aria-label="Custom Label">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom Label");
    });

    it("does not override custom aria-label with loading state", () => {
      render(
        <Button loading aria-label="Custom Loading Label">
          Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom Loading Label");
    });

    it("is keyboard accessible", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Keyboard Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("has proper test id", () => {
      render(<Button>Test ID Button</Button>);

      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("Complex Scenarios", () => {
    it("handles all props together", () => {
      const handleClick = vi.fn();
      const leftIcon = <span data-testid="complex-left">L</span>;
      const rightIcon = <span data-testid="complex-right">R</span>;

      render(
        <Button
          variant="danger"
          size="large"
          fullWidth
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          className="complex-button"
          onClick={handleClick}
          aria-label="Complex Button"
          data-testid="complex-test"
        >
          Complex Button
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "btn",
        "btn--danger",
        "btn--large",
        "btn--full-width",
        "complex-button"
      );
      expect(button).toHaveAttribute("aria-label", "Complex Button");
      expect(button).toHaveAttribute("data-testid", "complex-test");
      expect(screen.getByTestId("complex-left")).toBeInTheDocument();
      expect(screen.getByTestId("complex-right")).toBeInTheDocument();
    });

    it("handles missing onClick gracefully", async () => {
      const user = userEvent.setup();

      render(<Button>No Handler</Button>);

      const button = screen.getByRole("button");

      // Should not throw error
      await user.click(button);
      expect(button).toBeInTheDocument();
    });

    it("handles empty string className", () => {
      render(<Button className="">Empty Class</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn", "btn--primary", "btn--medium");
    });

    it("handles undefined props gracefully", () => {
      render(
        <Button
          variant={undefined as any}
          size={undefined as any}
          leftIcon={undefined}
          rightIcon={undefined}
        >
          Undefined Props
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn", "btn--primary", "btn--medium");
    });
  });

  describe("CSS Class Generation", () => {
    it("generates correct class string with all variants", () => {
      render(
        <Button
          variant="outline"
          size="small"
          loading
          fullWidth
          className="extra-class"
        >
          All Classes
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "btn",
        "btn--outline",
        "btn--small",
        "btn--loading",
        "btn--full-width",
        "extra-class"
      );
    });

    it("filters out falsy class values", () => {
      render(<Button className="">Filtered Classes</Button>);

      const button = screen.getByRole("button");
      const classes = button.className.split(" ");
      expect(classes).not.toContain("");
      expect(classes).not.toContain(undefined);
      expect(classes).not.toContain(null);
    });
  });
});
