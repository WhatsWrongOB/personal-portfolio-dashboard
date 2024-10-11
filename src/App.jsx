import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";

// Lazy loading components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProjectManagement = lazy(() => import("./pages/ProjectManagement"));
const SkillManagement = lazy(() => import("./pages/SkillManagement"));
const Report = lazy(() => import("./pages/Report"));

const App = () => {
  return (
    <Router>
      <div className="min-h-screen max-h-auto bg-gray-900 text-white flex justify-between relative">
        <Sidebar />
        <main
          id="overflow"
          className="w-full h-screen mt-[50px] md:mt-0 md:w-[95%] p-3 md:ml-[260px] overflow-auto"
        >
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectManagement />} />
              <Route path="/skills" element={<SkillManagement />} />
              <Route path="/report" element={<Report />} />
              <Route
                path="*"
                element={
                  <div className="w-full h-[85vh] flex justify-center items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://img.icons8.com/?size=48&id=15208&format=png"
                        alt=""
                      />{" "}
                      <p>Under contruction 👀</p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
