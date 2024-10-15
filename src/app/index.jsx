import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes";
import Sidebar from "../components/Sidebar";
import { lazy } from "react";

// Lazy loading components
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProjectManagement = lazy(() => import("../pages/ProjectManagement"));
const SkillManagement = lazy(() => import("../pages/SkillManagement"));
const Report = lazy(() => import("../pages/Report"));

const RootApp = () => {
  return (
    <div className="min-h-screen max-h-auto bg-gray-900 text-white flex justify-between relative">
      <Sidebar />
      <main
        id="overflow"
        className="w-full h-screen mt-[50px] md:mt-0 md:w-[95%] p-3 md:ml-[260px] overflow-auto"
      >
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/skills" element={<SkillManagement />} />
            <Route path="/report" element={<Report />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default RootApp;
