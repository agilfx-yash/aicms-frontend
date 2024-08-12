import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../containers/pages/dashboard";
import { AuthComponent } from "../containers/pages/AuthComponent";
import AICMSAnimation from "../containers/pages/AICMSAnimation";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />{" "}
        <Route path="/auth" element={<AuthComponent />} />{" "}
        <Route path="/animation" element={<AICMSAnimation />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
