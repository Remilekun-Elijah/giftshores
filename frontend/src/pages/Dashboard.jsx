/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import HomeLayout from "../layouts/Home";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import config from "../utils/config";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "../components/table/Table";
import TablePreloader from "../components/Loader/TablePreloader";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getUsers } from "../features/userSlice";
import dayjs from "dayjs";
import PieChart from "../components/others/PieChart";
import { getDashboardData } from "../features/dashboardSlice";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import AreaChart from "../components/others/AreaChat";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const { routes } = config;
export default function Dashboard() {
  const { loading, users, pagination } = useSelector(getUserData),
    { loading: dashLoading, analytics, stats } = useSelector(getDashboardData),
    dispatch = useDispatch();

  const analyticsMap = [
    {
      type: "Total Users",
      icon: PeopleAltIcon,
      ave: analytics?.latePercentage
        ? (
            Math.round(analytics?.earlyPercentage) +
            Math.round(analytics?.latePercentage)
          ).toFixed(2)
        : 0,
      amount: analytics?.totalUsers || 0,
      color: "#E5ECF6",
    },
    {
      type: "Total Sent Gifts",
      icon: SendIcon,
      ave: analytics?.earlyPercentage || 0,
      amount: analytics?.earlyComers || 0,
      color: "#E6F1D6",
    },
    {
      type: "Total Unsent Gifts",
      icon: ScheduleSendIcon,
      ave: analytics?.latePercentage || 0,
      amount: analytics?.lateComers || 0,
      color: "#F5EBEB",
    },
  ];

  useEffect(() => {
    Promise.all([
      dispatch(getUsers({ pageSize: 5 })),
      // dispatch(getDashboard()),
      // dispatch(getDashboardStats()),
    ]);
  }, []);

  const data = users.map((user, idx) => ({
    "S/N": pagination.pageSize * (pagination.page - 1) + idx + 1,
    name: user.firstName + " " + user.lastName,
    Department: user?.Department?.department || "N/A",
    "Staff ID": user.staffId || "N/A",
    BVN: user.bvn || "N/A",
    Branch: user?.Branch?.branchName || "N/A",
    "Date Created": dayjs(user.createdAt).format("MMM DD, YYYY"),
    Status: user.verified ? "Active" : "Inactive",
    _data: user,
  }));

  return (
    <HomeLayout>
      <div className="mb-10">
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="#040316"
          fontSize="32px"
          className="sofiaProBold"
          sx={{ my: 3 }}
        >
          Overview
        </Typography>

        <Box className="grid  lg:grid-cols-3 gap-10 flex-wrap mb-14">
          {dashLoading
            ? [1, 2, 3].map((_, i) => (
                <Skeleton
                  key={i}
                  animation="wave"
                  variant="rounded"
                  height="130px"
                />
              ))
            : analyticsMap.map((data, index) => {
                return (
                  <div
                    className="rounded border p-5"
                    key={index}
                    style={{ background: data.color }}
                  >
                    <div className="flex mb-10">
                      <data.icon color="black" />
                      <span className="ml-2">{data.type}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold">{data.amount}</span>

                      <div className="flex items-center">
                        {Math.round(data.ave) > 50 ? (
                          <NorthIcon
                            style={{
                              width: "14px",
                              fontSize: "20px",
                              fontWeight: "bolder",
                            }}
                          />
                        ) : (
                          <SouthIcon
                            style={{
                              width: "14px",
                              fontSize: "20px",
                              fontWeight: "bolder",
                            }}
                          />
                        )}
                        <span>{data.ave}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Box>

        <div
          className="flex flex-wrap gap-y-5 items-start justify-around mb-14 max-h-[300px] h-[220px] xl:h-[230px]"
          style={{ width: "100%" }}
        >
          <AreaChart
            {...{
              dataset: {
                labels: stats?.map?.((a) => a?.date),
                values: {
                  early: stats?.map((a) => a.early),
                  late: stats?.map((a) => a.late),
                },
              },
              title: "Monthly Report",
            }}
          />
          <div className="shado lg:w-[450px] w-full md:mt-0 my-10 lg:h-[200px] h-full">
            <h2 className="md:mt-7 lg:text-left text-center w-full pt- text-[17px] font-[600] tracking-[0.18px]">
              Genders
            </h2>{" "}
            <PieChart
              id="bankDash"
              data={[
                {
                  value: stats?.totalClosedJobs || 0,
                  name: loading ? "..." : `${stats?.totalClosedJobs || 0} Male`,
                },
                {
                  value: stats?.totalRejectedJobs || 0,
                  name: loading
                    ? "..."
                    : `${stats?.totalRejectedJobs || 0} Female`,
                },
                {
                  value: stats?.totalRejectedJobs || 0,
                  name: loading
                    ? "..."
                    : `${stats?.totalRejectedJobs || 0} Non-binary`,
                },
              ]}
              color={["blue", "green", "orange"]}
              wrapperClass=" w-full h-full items-center"
              pieChartClass="w-full h-full"
            />
          </div>

          <Box className="block w-full">
            <div className="w-full">
              <Container
                className="py-5 bg-[var(--c-bg-color)] rounded-lg lg:min-w-full"
                sx={{ px: 0 }}
              >
                <Box className="flex justify-between mb-2">
                  <Typography fontFamily={"Lota"}>All users</Typography>
                  {users.length > 0 && (
                    <Link
                      to={routes.user}
                      className="text-[var(--c-primary-0)] font-[Lota]"
                    >
                      See All{" "}
                      <ArrowForwardIcon
                        className="text-[var(--c-primary-0)]"
                        fontSize="small"
                      />
                    </Link>
                  )}
                </Box>

                {loading && users.length === 0 ? (
                  <TablePreloader />
                ) : (
                  <Table
                    {...{
                      data,
                      pagination: { ...pagination, hidden: true },
                      // setPagination: (d) => dispatch(setPagination(d)),
                      isLoading: loading,
                      tableMsg: [
                        "No User created,",
                        "Kindly check back later.",
                      ],
                    }}
                  />
                )}
              </Container>
            </div>
          </Box>
        </div>
      </div>
    </HomeLayout>
  );
}
