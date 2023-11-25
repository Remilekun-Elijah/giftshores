import Storage from "./storage";
import config from "./config";

/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.size  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
export const getFileSize = function (data = {}) {
  data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
  data.size = data.size !== (undefined || null || "") ? data.size : 50000000; // 50mb
  data.size = Number(data.size);
  const k = 1000;
  const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(data.size) / Math.log(k));
  const size = parseFloat(data.size / Math.pow(k, i)).toFixed(1);

  if (data.previewInConsole === true)
    console.info(data.size, " = ", size + format[i]);
  return size + " " + format[i];
};

export const getAmount = (num) => new Intl.NumberFormat().format(num);

export function currencyFormat(num, currencySymbol) {
  return (
    currencySymbol + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export const Roles = {
  vendor: "vendor",
  admin: "admin",
  bank: "bank_staff",
  superAdmin: "super_admin",
  solicitor: "solicitor",
};

export const loggedInUser = Storage.get(config.authProps[1]);
export const getRole = () => {
  let user = {};
  if (loggedInUser) {
    user = JSON.parse(loggedInUser);
  }
  return user?.role;
};

export const getId = () => {
  let user = {};
  if (loggedInUser) {
    user = JSON.parse(loggedInUser);
  }
  return {
    bank: user?.userId,
    admin: user?.userId,
    vendor: user?.vendorId,
    user: user?.userId,
  };
};

export const validateEmail = (email) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
};

export const capitalize = (string) => {
  const final = string?.replace(/\w\S*/g, (txt) => {
    let val = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    return val;
  });
  return final;
};
export const camelCasedPathName = () =>
  document.location.pathname
    .replace("/", "")
    .split("-")
    .map((r, i) => (i > 0 ? capitalize(r) : r))
    ?.join("");

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

export function formatTime(datetimeStr) {
  const datetime = new Date(datetimeStr);
  const time = datetime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}

export const handleSearch = ({ value, useCaps, cb }) => {
  const branch = useCaps ? capitalize(value) : value;
  cb(branch.trim());
};
