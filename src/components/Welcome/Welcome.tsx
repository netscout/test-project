import React from "react";
import "./Welcome.css";

interface WelcomeProps {
  title?: string;
  subtitle?: string;
  showGetStarted?: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({
  title = "Welcome to Our Project",
  subtitle = "Start building something amazing today",
  showGetStarted = true,
}) => {
  const handleGetStarted = () => {
    // TODO: Implement navigation logic
    console.log("Get started clicked");
  };

  const handleLearnMore = () => {
    // TODO: Implement learn more logic
    console.log("Learn more clicked");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="hero-section">
          <h1 className="welcome-title">{title}</h1>
          <p className="welcome-subtitle">{subtitle}</p>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Development</h3>
            <p>
              Built with modern tools and best practices for rapid development
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>High Performance</h3>
            <p>
              Optimized for speed and efficiency with cutting-edge technology
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Clean, modern interface designed for the best user experience</p>
          </div>
        </div>

        {showGetStarted && (
          <div className="actions-section">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
