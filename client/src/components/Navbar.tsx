import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react"; // Añadí el icono User
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  // Efecto para verificar autenticación al cargar
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav style={{ borderBottom: "1px solid #ccc", backgroundColor: "#fff", width: "100%" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Logo (sin cambios) */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            gap: "8px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ height: "24px", width: "24px", color: "green" }}
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            Moverse Rural
          </span>
        </Link>

        {/* Search Bar (sin cambios) */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: "1 1 300px",
            display: "flex",
            position: "relative",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Input
            type="search"
            placeholder="Search villages..."
            style={{
              width: "100%",
              padding: "10px 40px 10px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "auto",
              padding: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Search style={{ height: "20px", width: "20px", color: "#666" }} />
            <span style={{ display: "none" }}>Search</span>
          </Button>
        </form>

        {/* Área de usuario - CAMBIO PRINCIPAL */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>{user.email}</div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                style={{ marginLeft: "8px" }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;