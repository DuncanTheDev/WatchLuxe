import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setErrorMessage("");
  };

  const validateForm = () => {
    let errors = {};
    let globalErrors = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = "This field is required";
      }
    });

    const isPasswordValidLength = formData.password.length >= 8;
    const doPasswordsMatch = formData.password === formData.password_confirmation;

    if (!isPasswordValidLength) {
      globalErrors.push("Password must be at least 8 characters");
    }

    if (isPasswordValidLength && !doPasswordsMatch) {
      globalErrors.push("Passwords do not match");
    }

    setFieldErrors(errors);
    setErrorMessage(globalErrors.join(" | "));
    return Object.keys(errors).length === 0 && globalErrors.length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await api.post("/register", formData);
      console.log("Register:", response.data);

      localStorage.setItem("token", response.data.token);
      navigate("/signin");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors;

        if (backendErrors?.email) {
          setFieldErrors((prev) => ({
            ...prev,
            email: backendErrors.email[0] || "Email already exists",
          }));
        }
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleLogIn = () => navigate("/signin");

  return (
    <div className="signup">
      <div className="register-header">
        <h1>WatchLuxe Registration</h1>
        <p>Join us and explore exclusive watches</p>
      </div>

      <form className="register-form" onSubmit={handleRegister}>
        <div className="name-group">
          <div className="firstname">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={fieldErrors.first_name ? "error" : ""}
            />
            {fieldErrors.first_name && (
              <p className="error-text">{fieldErrors.first_name}</p>
            )}
          </div>

          <div className="lastname">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={fieldErrors.last_name ? "error" : ""}
            />
            {fieldErrors.last_name && (
              <p className="error-text">{fieldErrors.last_name}</p>
            )}
          </div>
        </div>

        <div className="register-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldErrors.email ? "error" : ""}
          />
          {fieldErrors.email && (
            <p className="error-text">{fieldErrors.email}</p>
          )}
        </div>

        <div className="register-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={fieldErrors.password ? "error" : ""}
          />
        </div>

        <div className="register-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className={fieldErrors.password_confirmation ? "error" : ""}
          />
        </div>

        {errorMessage && <p className="global-error">{errorMessage}</p>}

        <div className="register-btn">
          <button type="submit">REGISTER</button>
        </div>

        <div className="signin-acc">
          <p>Already have an account?</p>
          <p className="signin-btn" onClick={handleLogIn}>
            Sign in
          </p>
        </div>
      </form>
    </div>
  );
}
