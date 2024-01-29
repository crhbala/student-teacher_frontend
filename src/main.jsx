import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as Mui from "@material-ui/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Mui.Typography component="span">
      <Mui.Grid component="span">
        <App />
      </Mui.Grid>
    </Mui.Typography>
  </React.StrictMode>
);
