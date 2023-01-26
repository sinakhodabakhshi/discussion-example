import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DiscussionContext from "./context/DiscussionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DiscussionContext>
      <App />
    </DiscussionContext>
  </React.StrictMode>
);
