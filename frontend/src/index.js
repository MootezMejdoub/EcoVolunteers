import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleContext";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import { FollowingProvider } from "./context/FollowingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <FollowingProvider>
          <ToggleProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ToggleProvider>
        </FollowingProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
