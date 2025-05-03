import Layout from "../components/layout";
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

interface Preference {
  id: number;
  preference_type: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  preference: string;
  agreeTerms: boolean;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  preference?: string;
}

const Register = () => {
  const [preferences] = useState([
    { id: "a", name: "a", label: "Playa 🏖️" },
    { id: "b", name: "b", label: "Montaña ⛰️" },
    { id: "c", name: "c", label: "Ciudad 🏙️" },
    { id: "d", name: "d", label: "Ninguna preferencia" }
  ]);
  
  // En handleSubmit se envía formData.preference que ahora tendrá los valores correctos (a/b/c/d)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    preference: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.preference) {
      newErrors.preference = "Please select a preference";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!formData.agreeTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          preference: formData.preference, // Envía el valor directo ("playa", "montaña")
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }
  
      toast.success("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      console.error("Error completo:", error);
      toast.error(error.message || "Error en el registro. Por favor intenta nuevamente.");
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
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

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
                  <label htmlFor="password">Password</label>
                  <Input
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
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Preferencia de ubicación</label>
                  <div className="preferences-grid">
                    {preferences.map((pref) => (
                      <div key={pref.id} className="preference-option">
                        <input
                          type="radio"
                          id={`pref-${pref.id}`}
                          name="preference"
                          value={pref.name}
                          checked={formData.preference === pref.name}
                          onChange={() => setFormData(prev => ({
                            ...prev, 
                            preference: pref.name
                          }))}
                          required
                          className="preference-radio"
                        />
                        <label htmlFor={`pref-${pref.id}`}>
                          {pref.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.preference && (
                    <p className="error-text">{errors.preference}</p>
                  )}
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
                    I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading || !formData.agreeTerms}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="signup-text">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="link-primary">
                    Sign in
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

export default Register;