const environment = {};
// import process from "process";
if (import.meta.env.MODE === "production") {
  // your code here
}

// console.log(import.meta.env);

const routes = {
  home: "/",
  dashboard: "/",
  create: "/create-list",
  user: "/users",
  report: "/reports",
};

environment.development = {
  appUser: import.meta.env.VITE_APP_USER,
  authProps: ["g/token", "g/user"],
  backendUrl: "http://localhost:3000/v1",
  routes,
  frontendUrl: "https://www.giftshores.com/",
};

environment.staging = {
  authProps: ["g/token", "g/user"],
  backendUrl: "https://api-giftshores.onrender.com/v1",
  routes,
  frontendUrl: "https://www.giftshores.com/",
};

environment.production = {
  appUser: import.meta.env.VITE_APP_USER,
  authProps: ["g/token", "g/user"],
  backendUrl: "https://api-giftshores.onrender.com/v1",
  routes,
  frontendUrl: "https://www.giftshores.com/",
};

const env = environment[import.meta.env.MODE];
console.log(env);

export default env;
