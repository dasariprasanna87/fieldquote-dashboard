import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FieldQuoteDashboard from "./FieldQuote_Dashboard.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <FieldQuoteDashboard />
  </StrictMode>,
);
