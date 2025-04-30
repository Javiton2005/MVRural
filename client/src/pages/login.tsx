import Layout from "../components/layout"
import React, { useState,useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './index.css'
import "./Login.css"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      rememberMe: false,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Login successful!");
        navigate("/");
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Sign in to your account</h2>
            <p className="card-description">
              Enter your email below to access the VillageHub platform
            </p>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
  
              <div className="form-group">
                <div className="form-label-inline">
                  <label htmlFor="password">Password</label>
                  <a href="/forgot-password" className="link-small">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
  
              <div className="form-group checkbox-group">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rememberMe: e.target.checked,
                    }))
                  }
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
  
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
  
            <div className="signup-text">
              <p>
                Don't have an account?{" "}
                <a href="/register" className="link-primary">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;