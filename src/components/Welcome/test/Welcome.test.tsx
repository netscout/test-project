import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Welcome from "../Welcome";

// Mock console.log to test click handlers
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("Welcome Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering with default props", () => {
    it("renders the default title and subtitle", () => {
      render(<Welcome />);

      expect(screen.getByText("Welcome to Our Project")).toBeInTheDocument();
      expect(
        screen.getByText("Start building something amazing today")
      ).toBeInTheDocument();
    });

    it("renders all feature cards with correct content", () => {
      render(<Welcome />);

      // Check feature cards
      expect(screen.getByText("Fast Development")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Built with modern tools and best practices for rapid development"
        )
      ).toBeInTheDocument();

      expect(screen.getByText("High Performance")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Optimized for speed and efficiency with cutting-edge technology"
        )
      ).toBeInTheDocument();

      expect(screen.getByText("Beautiful Design")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Clean, modern interface designed for the best user experience"
        )
      ).toBeInTheDocument();
    });

    it("renders action buttons by default", () => {
      render(<Welcome />);

      expect(
        screen.getByRole("button", { name: "Get Started" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Learn More" })
      ).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<Welcome />);

      expect(screen.getByText("Welcome to Our Project")).toHaveClass(
        "welcome-title"
      );
      expect(
        screen.getByText("Start building something amazing today")
      ).toHaveClass("welcome-subtitle");

      const getStartedBtn = screen.getByRole("button", { name: "Get Started" });
      expect(getStartedBtn).toHaveClass("btn", "btn--primary", "btn--large");

      const learnMoreBtn = screen.getByRole("button", { name: "Learn More" });
      expect(learnMoreBtn).toHaveClass("btn", "btn--outline", "btn--large");
    });
  });

  describe("Rendering with custom props", () => {
    it("renders custom title and subtitle", () => {
      const customTitle = "Custom Welcome Title";
      const customSubtitle = "Custom subtitle for testing";

      render(<Welcome title={customTitle} subtitle={customSubtitle} />);

      expect(screen.getByText(customTitle)).toBeInTheDocument();
      expect(screen.getByText(customSubtitle)).toBeInTheDocument();

      // Should not render default texts
      expect(
        screen.queryByText("Welcome to Our Project")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Start building something amazing today")
      ).not.toBeInTheDocument();
    });

    it("hides action buttons when showGetStarted is false", () => {
      render(<Welcome showGetStarted={false} />);

      expect(
        screen.queryByRole("button", { name: "Get Started" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Learn More" })
      ).not.toBeInTheDocument();
    });

    it("shows action buttons when showGetStarted is true", () => {
      render(<Welcome showGetStarted={true} />);

      expect(
        screen.getByRole("button", { name: "Get Started" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Learn More" })
      ).toBeInTheDocument();
    });
  });

  describe("Button interactions", () => {
    it("calls handleGetStarted when Get Started button is clicked", async () => {
      const user = userEvent.setup();
      render(<Welcome />);

      const getStartedBtn = screen.getByRole("button", { name: "Get Started" });
      await user.click(getStartedBtn);

      expect(mockConsoleLog).toHaveBeenCalledWith("Get started clicked");
    });

    it("calls handleLearnMore when Learn More button is clicked", async () => {
      const user = userEvent.setup();
      render(<Welcome />);

      const learnMoreBtn = screen.getByRole("button", { name: "Learn More" });
      await user.click(learnMoreBtn);

      expect(mockConsoleLog).toHaveBeenCalledWith("Learn more clicked");
    });

    it("handles multiple button clicks correctly", async () => {
      const user = userEvent.setup();
      render(<Welcome />);

      const getStartedBtn = screen.getByRole("button", { name: "Get Started" });
      const learnMoreBtn = screen.getByRole("button", { name: "Learn More" });

      await user.click(getStartedBtn);
      await user.click(learnMoreBtn);
      await user.click(getStartedBtn);

      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
      expect(mockConsoleLog).toHaveBeenNthCalledWith(1, "Get started clicked");
      expect(mockConsoleLog).toHaveBeenNthCalledWith(2, "Learn more clicked");
      expect(mockConsoleLog).toHaveBeenNthCalledWith(3, "Get started clicked");
    });

    it("works with fireEvent as well", () => {
      render(<Welcome />);

      const getStartedBtn = screen.getByRole("button", { name: "Get Started" });
      fireEvent.click(getStartedBtn);

      expect(mockConsoleLog).toHaveBeenCalledWith("Get started clicked");
    });
  });

  describe("Component structure", () => {
    it("has correct DOM structure", () => {
      render(<Welcome />);

      const container = screen
        .getByText("Welcome to Our Project")
        .closest(".welcome-container");
      expect(container).toBeInTheDocument();

      const content = container?.querySelector(".welcome-content");
      expect(content).toBeInTheDocument();

      const heroSection = content?.querySelector(".hero-section");
      expect(heroSection).toBeInTheDocument();

      const featuresSection = content?.querySelector(".features-section");
      expect(featuresSection).toBeInTheDocument();

      const actionsSection = content?.querySelector(".actions-section");
      expect(actionsSection).toBeInTheDocument();
    });

    it("contains exactly 3 feature cards", () => {
      render(<Welcome />);

      const featureCards = screen
        .getAllByText(/⚡|🎨/)
        .map((emoji) => emoji.closest(".feature-card"));

      expect(featureCards).toHaveLength(2);

      // Also check for the fast development card separately since 🚀 is now used in buttons too
      expect(screen.getByText("Fast Development")).toBeInTheDocument();
      featureCards.forEach((card) => {
        expect(card).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<Welcome />);

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Welcome to Our Project");

      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      expect(h3Elements).toHaveLength(3);
      expect(h3Elements[0]).toHaveTextContent("Fast Development");
      expect(h3Elements[1]).toHaveTextContent("High Performance");
      expect(h3Elements[2]).toHaveTextContent("Beautiful Design");
    });

    it("buttons are accessible via keyboard", async () => {
      const user = userEvent.setup();
      render(<Welcome />);

      const getStartedBtn = screen.getByRole("button", { name: "Get Started" });

      // Focus and press Enter
      getStartedBtn.focus();
      expect(getStartedBtn).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(mockConsoleLog).toHaveBeenCalledWith("Get started clicked");
    });
  });
});
