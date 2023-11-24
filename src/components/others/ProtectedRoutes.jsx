import { Outlet, Navigate } from "react-router-dom";
import Storage from "../../utils/storage";
import config from "../../utils/config";

export default function ProtectedRoutes() {
  return (
    <>
      {Storage.get(config.authProps[0]) === null ? (
        Navigate({ to: config.routes.home })
      ) : (
        <Outlet />
      )}
    </>
  );
}
