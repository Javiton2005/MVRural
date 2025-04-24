import React, { useState } from "react";
import { Button } from "./ui/button"; // Ensure the path is correct
import { Input } from "./ui/input"; // Ensure the path is correct
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav style={{ borderBottom: "1px solid #ccc", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
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
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Moverse Rural</span>
        </Link>

        <form onSubmit={handleSearch} style={{ display: "flex", position: "relative", maxWidth: "400px", flex: "1", margin: "0 16px" }}>
          <Input
            type="search"
            placeholder="Search villages..."
            style={{ width: "100%", paddingRight: "40px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            style={{ position: "absolute", right: "0", top: "0", height: "100%" }}
          >
            <Search style={{ height: "16px", width: "16px" }} />
            <span style={{ display: "none" }}>Search</span>
          </Button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;