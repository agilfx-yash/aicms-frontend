import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../containers/pages/dashboard";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />{" "}
      </Routes>
    </div>
  );
}

export default AppRoutes;
