import config from "../utils/config";
import Dashboard from "./Dashboard";
import GiftList from "./GiftList";
import Home from "./Home";

const { routes } = config;
const Pages = [
  {
    path: routes.create,
    element: <GiftList />,
  },
  {
    path: routes.dashboard,
    element: <Dashboard />,
  },
];

export default Pages;
