import { useState } from "react";
import { userAuthService } from "../services/userAuthService";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    const { user, error } = await userAuthService.register(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate("/home"); // Redirect to home after successful registration
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      
      {/* Add a link to go back to the login page */}
      <p>
        Already have an account? <button onClick={() => navigate("/login")}>Login here</button>
      </p>
    </div>
  );
};

export default UserRegistration;
