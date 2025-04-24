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
    borderRadius: "6px", // Cambia esto según el tamaño de borde que desees
    fontSize: "14px", // Cambia esto según el tamaño de fuente que desees
    fontWeight: "500",
    transition: "background-color 0.2s ease, color 0.2s ease",
    outline: "none",
    cursor: "pointer",
  },
  variants: {
    default: {
      backgroundColor: "#28A745", // Color de fondo primario
      color: "#ffffff", // Color de texto primario
      boxShadow: "none", // <-- Esto lo añade
      "&:hover": {
        backgroundColor: "#0056b3", // Color de fondo al pasar el mouse
      },
    },
    destructive: {
      backgroundColor: "#dc3545", // Color de fondo destructivo
      color: "#ffffff", // Color de texto destructivo
      "&:hover": {
        backgroundColor: "#c82333", // Color de fondo al pasar el mouse
      },
    },
    outline: {
      border: "1px solid #ced4da", // Borde de entrada
      backgroundColor: "#ffffff", // Color de fondo
      color: "#495057", // Color de texto
      "&:hover": {
        backgroundColor: "#f8f9fa", // Color de fondo al pasar el mouse
      },
    },
    secondary: {
      backgroundColor: "#6c757d", // Color de fondo secundario
      color: "#ffffff", // Color de texto secundario
      "&:hover": {
        backgroundColor: "#5a6268", // Color de fondo al pasar el mouse
      },
    },
    ghost: {
      backgroundColor: "transparent", // Fondo transparente
      color: "#007bff", // Color de texto
      "&:hover": {
        backgroundColor: "#e2e6ea", // Color de fondo al pasar el mouse
      },
    },
    link: {
      backgroundColor: "transparent", // Fondo transparente
      color: "#007bff", // Color de texto
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
    const style = {
      ...buttonStyles.base,
      ...buttonStyles.variants[variant],
      ...buttonStyles.sizes[size],
      ...props.style, // Permitir estilos adicionales
    };

    return (
      <Comp
        style={style}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };