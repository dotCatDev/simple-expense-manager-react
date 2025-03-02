// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from "./context/userContext";
import Home from "./pages/Home";
import Login from "./components/Login";
import Registration from "./components/UserRegistration";
import { ExpenseProvider } from "./context/expenseContext"

const App: React.FC = () => {
  return (
    <UserProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
          </Routes>
        </Router>
      </ExpenseProvider>
    </UserProvider>
  );
};

const AuthRedirect: React.FC = () => {
  const { user } = useUserContext();
  return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

type ProtectedRouteProps = {
  component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user } = useUserContext();
  return user ? <Component /> : <Navigate to="/login" />;
};

export default App;
