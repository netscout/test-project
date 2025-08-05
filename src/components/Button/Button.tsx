import React from "react";
import "./Button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "btn";
    const variantClass = `btn--${variant}`;
    const sizeClass = `btn--${size}`;
    const loadingClass = loading ? "btn--loading" : "";
    const fullWidthClass = fullWidth ? "btn--full-width" : "";
    const customClass = className;

    return [
      baseClasses,
      variantClass,
      sizeClass,
      loadingClass,
      fullWidthClass,
      customClass,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const renderIcon = (icon: React.ReactNode, position: "left" | "right") => {
    if (!icon) return null;

    return (
      <span className={`btn__icon btn__icon--${position}`} aria-hidden="true">
        {icon}
      </span>
    );
  };

  const renderLoadingSpinner = () => {
    if (!loading) return null;

    return (
      <span
        className="btn__spinner"
        aria-hidden="true"
        data-testid="button-spinner"
      >
        <svg
          className="btn__spinner-svg"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="btn__spinner-circle"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  };

  const getAriaLabel = () => {
    if (props["aria-label"]) {
      return props["aria-label"];
    }

    if (loading) {
      return `${children} - Loading`;
    }

    return undefined;
  };

  return (
    <button
      className={getButtonClasses()}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={getAriaLabel()}
      aria-busy={loading}
      data-testid={props["data-testid"] || "button"}
      {...props}
    >
      {renderLoadingSpinner()}
      {!loading && renderIcon(leftIcon, "left")}
      <span className="btn__content">{children}</span>
      {!loading && renderIcon(rightIcon, "right")}
    </button>
  );
};

export default Button;
