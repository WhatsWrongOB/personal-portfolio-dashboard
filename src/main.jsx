import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { AppProvider } from "./context/index.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Toaster />
    <App />
  </AppProvider>
);
