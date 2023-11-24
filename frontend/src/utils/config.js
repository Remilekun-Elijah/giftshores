const environment = {};
// const process = process;

const routes = {
  home: "/",
  dashboard: "/dashboard",
  create: "/create-list",
};

environment.development = {
  authProps: ["g/token", "g/user"],
  // backendUrl:
  // process.env.REACT_APP_BACKEND_URL || "http://104.248.172.21:8002/",
  routes,
  frontendUrl: "http://104.248.172.21:3001/",
};

environment.staging = {
  authProps: ["g/token", "g/user"],
  // backendUrl:
  //   process.env.REACT_APP_BACKEND_URL || "http://104.248.172.21:8002/",
  routes,
  frontendUrl: "http://104.248.172.21:3001/",
};

environment.production = {
  authProps: ["g/token", "g/user"],
  // backendUrl:
  //   process.env.REACT_APP_BACKEND_URL || "http://104.248.172.21:8002/",
  routes,
  frontendUrl: "http://104.248.172.21:3001/",
};
console.log(environment);

export default environment["development"];
