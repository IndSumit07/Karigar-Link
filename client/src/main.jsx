import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { RFQProvider } from "./contexts/RFQContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RFQProvider>
        <App />
      </RFQProvider>
    </AuthProvider>
  </BrowserRouter>
);
