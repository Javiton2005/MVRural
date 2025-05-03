import Layout from "../components/layout"
import React, { useState,useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' || name === 'confirmPassword') {
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }
};

const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }));
};

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <div className="register-card-wrapper">
          <div className="register-card">
            <div className="card-header">
              <h2 className="card-title">Create an account</h2>
              <p className="card-description">
                Enter your information to get started with VillageHub
              </p>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

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
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>

                <div className="form-group checkbox-group">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleCheckboxChange}
                    required
                    className="checkbox-input"
                  />
                  <label htmlFor="agreeTerms" className="checkbox-label">
                    I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading || !formData.agreeTerms}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="signup-text">
                <p>
                  Already have an account? <Link to="/login" className="link-primary">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;