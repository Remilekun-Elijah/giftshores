import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Pages from "./pages/Index";
import config from "./utils/config";
import ProtectedRoutes from "./components/others/ProtectedRoutes";
import Home from "./pages/Home";
import StylishMouseMovent from "./components/others/StylishMouseMovement";

function App() {
  const { routes } = config;
  window.addEventListener("offline", () => console.log("offline"));
  window.addEventListener("online", () => console.log("online"));

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route
            {...{
              path: routes.home,
              element: <Home />,
            }}
          />
          {/* <Route element={<ProtectedRoutes />}> */}
          {Pages.map((p, i) => (
            <Route key={i} {...p} />
          ))}
          {/* </Route> */}
        </Routes>
        <StylishMouseMovent />
      </div>
    </BrowserRouter>
  );
}

export default App;
