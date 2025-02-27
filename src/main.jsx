import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import TokenAuth from "./contexts/TokenAuth.jsx";
import EditPostContext from "./contexts/EditPostContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <TokenAuth>
        <EditPostContext>
          <App />
        </EditPostContext>
      </TokenAuth>
    </StrictMode>
  </BrowserRouter>
);
