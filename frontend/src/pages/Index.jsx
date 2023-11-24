import config from "../utils/config";
import GiftList from "./GiftList";
import Home from "./Home";

const { routes } = config;
const Pages = [
  {
    path: routes.create,
    element: <GiftList />,
  },
];

export default Pages;
