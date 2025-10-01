import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!login.email || !login.password) {
      setErrMsg("Incorrect email or password!");
      return;
    }

    try {
      const response = await api.post("/login", login);

      console.log("Login successful: ", response.data);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      console.error("Login Failed, Please try again: ", err);
      if (err.response?.status === 401) {
        setErrMsg("Incorrect email or password");
      } else {
        setErrMsg("Incorrect email or password");
      }
    }
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <div className="signin">
      <div className="login-header">
        <h1>Welcome to WatchLuxe</h1>
        <p>Sign in to access your exclusive watch collection</p>
      </div>
      <div className="login-form">
        <div className="login-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
        </div>
        <div className="login-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
        </div>
        <div className="forgot">
          <p>Forgot your password?</p>
        </div>
        {errMsg && <p className="error-text">{errMsg}</p>}
        <div className="login-btn">
          <button onClick={handleLogin}>LOG IN</button>
        </div>
        <div className="create-acc">
          <p>Dont have account yet?</p>
          <p className="create" onClick={handleSignUp}>
            Create one now
          </p>
        </div>
      </div>
    </div>
  );
}
