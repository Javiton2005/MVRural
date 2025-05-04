import Layout from "../components/layout"
import React, { useState,useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'; 
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
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || "Login failed");
        }
    
        localStorage.setItem("user", JSON.stringify({
          name: data.user.username,    // Asegúrate que el backend devuelva estos campos
          email: data.user.email
        }));
    
        toast.success(data.message || "Login successful!");
        navigate("/");
    
      } catch (error: any) {
        toast.error(error.message || "Login failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    };
    
    
    
  
    return (
      <Layout>
        <div className="login-container">
          <div className="login-card-wrapper">
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
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
  
                  <div className="form-group">
                    <div className="form-label-inline">
                      <label htmlFor="password">Password</label>
                      <Link to="/forgot-password" className="link-small">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field"
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
                      className="checkbox-input"
                    />
                    <label htmlFor="rememberMe" className="checkbox-label">
                      Remember me
                    </label>
                  </div>
  
                  <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Sign In"}
                  </button>
                </form>
  
                <div className="signup-text">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="link-primary">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Login;
  