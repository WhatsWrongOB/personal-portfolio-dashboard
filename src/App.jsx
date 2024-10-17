import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const Login = lazy(() => import("./pages/Login"));
const RootApp = lazy(() => import("./app"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<RootApp />} />
          <Route
            path="*"
            element={
              <div className="w-full h-[85vh] flex justify-center items-center">
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.icons8.com/?size=48&id=15208&format=png"
                    alt=""
                  />
                  <p>404 Page Not Found 👀</p>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
