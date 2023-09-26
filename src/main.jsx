import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <BrowserRouter basename="/capstone-app">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </PrimeReactProvider>
);
