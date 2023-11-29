import config from "../utils/config";
import Dashboard from "./Dashboard";
import Report from "./Report";
import Login from "./Login";

const { routes } = config;
const Pages = [
  {
    path: routes.home,
    element: <Login />,
  },
  {
    path: routes.dashboard,
    element: <Dashboard />,
  },
  {
    path: routes.report,
    element: <Report />,
  },
];

export default Pages;
