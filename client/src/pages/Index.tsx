import Layout from "../components/layout"
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './index.css'
import { MapPin, Map, Globe, Users } from "react-feather";

const Index: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };
    return (
        <Layout>
            <section className="relative bg-gradient-to-r from-primary/90 to-accent/90 text-white py-20 sectiona">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Beautiful Villages Around Spain</h1>
            <p className="text-lg mb-8">
              Explore unique communities, connect with locals, and experience the charm of village life.
            </p>
            <form
                onSubmit={handleSearch}
                style={{
                flex: "1 1 300px", // que se expanda pero mínimo 300px
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
          </div>
        </div>
      </section>
      <section className="why-use-villagehub">
      <div className="container">
        <h2 className="title">Why Use Moverme Rural?</h2>
        <div className="grid">
          <div className="card">
            <div className="icon-container">
              <MapPin className="icon map-pin-icon" />
            </div>
            <h3 className="subtitle">Discover Hidden Gems</h3>
            <p className="description">
              Find beautiful villages off the beaten path that tourists often miss.
            </p>
          </div>

          <div className="card">
            <div className="icon-container">
              <Map className="icon map-icon" />
            </div>
            <h3 className="subtitle">Plan Your Future life</h3>
            <p className="description">
              Get detailed information to help you plan your perfect village getaway.
            </p>
          </div>

          <div className="card">
            <div className="icon-container">
              <Globe className="icon globe-icon" />
            </div>
            <h3 className="subtitle">Global Community</h3>
            <p className="description">
              Connect with village enthusiasts from around the world.
            </p>
          </div>

          <div className="card">
            <div className="icon-container">
              <Users className="icon users-icon" />
            </div>
            <h3 className="subtitle">Support Local Culture</h3>
            <p className="description">
              Help preserve the unique traditions and lifestyles of villages worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="sectionc">
      <div className="container">
        <div className="content">
          <h2 className="title">Ready to Discover Your Next Home?</h2>
          <p className="subtitle">
            Join our community of village enthusiasts and start exploring today.
          </p>
          <div className="button-group">
            <button className="btn primary" onClick={() => navigate('/register')}>
              Sign Up Now
            </button>

            <div className="separator"></div>

            <button className="btn secondary" onClick={() => navigate('/villages')}>
              Browse Villages
            </button>
          </div>
        </div>
      </div>
    </section>



    </Layout>
    );
};

export default Index;