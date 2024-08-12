import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../containers/pages/dashboard";
import { AuthComponent } from "../containers/pages/AuthComponent";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthComponent />} />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />{" "}
      </Routes>
    </div>
  );
}

export default AppRoutes;
