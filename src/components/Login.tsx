import { useState } from "react";
import { userAuthService } from "../services/userAuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const { user, error } = await userAuthService.login(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate("/home"); // Redirect to home after login
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      
      {/* Add a link to the registration page */}
      <p>
        Don't have an account? <button onClick={() => navigate("/registration")}>Register here</button>
      </p>
    </div>
  );
};

export default Login;
