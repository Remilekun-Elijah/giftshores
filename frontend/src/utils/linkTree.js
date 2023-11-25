/* eslint-disable jsx-a11y/alt-text */
import config from "./config";
import { Roles } from "./helper";

const { admin, bank, vendor } = Roles;

const { routes } = config;

const links = [
  {
    authorizedUsers: ["all"],
    name: "Dashboard",
    url: routes.dashboard,
    id: 0,
  },
  {
    authorizedUsers: [admin],
    name: "Registered Vendors",
    url: routes.registeredVendor,
    id: 1,
  },
  {
    authorizedUsers: [admin],
    name: "Registered Employees",
    url: routes.registeredEmployees,
    id: 2,
  },
  {
    authorizedUsers: ["all"],
    name: "Pending Jobs",
    url: routes.pendingJobs,
    id: 3,
  },
  {
    authorizedUsers: [admin],
    name: "Manual Reassignment",
    url: routes.manualReassignment,
    id: 4,
  },

  {
    authorizedUsers: [bank, vendor, admin],
    name: "Pending Acknowledgment",
    url: routes.pendingAcknowledgment,
    id: 5,
  },
  {
    authorizedUsers: [bank, vendor, admin],
    name: "Rejected Jobs",
    url: routes.rejectedJobs,
    id: 6,
  },
  {
    authorizedUsers: [bank, admin],
    name: "Closed Jobs",
    url: routes.closedJobs,
    id: 7,
  },
  {
    authorizedUsers: [bank, admin],
    name: "Awaiting Branch Confirmation",
    url: routes.awaitingBranchConfirmation,
    id: 8,
  },
  {
    authorizedUsers: ["all"],
    name: "Awaiting Payments",
    url: routes.awaitingPayments,
    id: 9,
  },
  {
    authorizedUsers: [admin],
    name: "Paid Jobs",
    url: routes.paidJobs,
    id: 10,
  },
  {
    authorizedUsers: [bank, admin],
    name: "Awaiting Vendor Assignment",
    url: routes.awaitingVendorAssignment,
    id: 11,
  },
  {
    authorizedUsers: [admin],
    name: "Reports",
    url: routes.reports,
    id: 12,
  },
];

export default links;
