import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./context/AuthContext.jsx";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </PrimeReactProvider>
);
