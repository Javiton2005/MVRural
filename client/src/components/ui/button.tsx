import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonStyles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s ease, color 0.2s ease",
    outline: "none",
    cursor: "pointer",
  },
  variants: {
    default: {
      backgroundColor: "#28A745",
      color: "#ffffff",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#51db71",
      },
    },
    destructive: {
      backgroundColor: "#dc3545",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#c82333",
      },
    },
    outline: {
      border: "1px solid #ced4da",
      backgroundColor: "#ffffff",
      color: "#495057",
      "&:hover": {
        backgroundColor: "#51db71",
      },
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#5a6268",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#007bff",
      "&:hover": {
        backgroundColor: "#e2e6ea",
      },
    },
    link: {
      backgroundColor: "transparent",
      color: "#007bff",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  sizes: {
    default: {
      height: "40px",
      padding: "0 16px",
    },
    sm: {
      height: "36px",
      padding: "0 12px",
    },
    lg: {
      height: "44px",
      padding: "0 32px",
    },
    icon: {
      height: "40px",
      width: "40px",
    },
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.sizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [hovered, setHovered] = React.useState(false);

    const baseStyle = {
      ...buttonStyles.base,
      ...buttonStyles.variants[variant],
      ...buttonStyles.sizes[size],
      ...props.style, // permitir sobrescritura de estilos externos
    };

    const hoverStyle = buttonStyles.variants[variant]["&:hover"] || {};

    const finalStyle = hovered
      ? { ...baseStyle, ...hoverStyle }
      : baseStyle;

    return (
      <Comp
        style={finalStyle}
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
