import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// browser router is used to create a single page application
// it is used to manage the routing of the application
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
