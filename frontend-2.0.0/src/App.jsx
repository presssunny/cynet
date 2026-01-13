import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
