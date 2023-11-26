/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
import dayjs from "dayjs";
import PieChart from "../components/others/PieChart";
import {
  getDashboardData,
  getDashboardStats,
  getReport,
} from "../features/dashboardSlice";
import AreaChart from "../components/others/AreaChat";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { capitalize, getAmount } from "../utils/helper";

const { routes } = config;
export default function Dashboard() {
  const { loading, pagination, modalLoading, reports, analytics, stats } =
      useSelector(getDashboardData),
    dispatch = useDispatch();

  console.log(analytics);

  const statsMap = [
    {
      type: "Total Reports",
      icon: PeopleAltIcon,
      amount: stats?.totalReport || 0,
      color: "linear-gradient(45deg, #E5ECF6, grey)",
    },
    {
      type: "Total Sent Gifts",
      icon: SendIcon,
      amount: stats?.totalSent || 0,
      color: "linear-gradient(45deg, #ECB5E9, #975F94)",
    },
    {
      type: "Total Unsent Gifts",
      icon: ScheduleSendIcon,
      amount: stats?.totalUnsent || 0,
      color: "linear-gradient(45deg, #E87885, silver)",
    },
    {
      type: "Total Shared",
      icon: WhatsAppIcon,
      amount: stats?.totalSharedToWhatsapp || 0,
      color: "linear-gradient(45deg, #62BB47, #B6ECA7)",
    },
    {
      type: "Total Sent to mail",
      icon: ForwardToInboxIcon,
      amount: stats?.totalSentToMail || 0,
      color: "linear-gradient(45deg, #E28282, #EADB9C)",
    },
  ];

  useEffect(() => {
    Promise.all([
      dispatch(getReport({ pageSize: 5 })),
      dispatch(getDashboardStats()),
    ]);
  }, []);

  const data = reports?.map(({ createdAt, owner, isSent, via }) => ({
    name: owner?.firstName + " " + owner?.lastName,
    email: owner?.email || "N/A",
    gender: owner?.gender || "N/A",
    country: owner?.country || "N/A",
    via: via ? capitalize(via) : "N/A",
    "Date Created": dayjs(createdAt).format("MMM DD, YYYY"),
    Status: isSent ? "Sent" : "Not Sent",
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

        <Box className="grid  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-10 flex-wrap mb-14">
          {loading
            ? Array(5)
                .fill("")
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    variant="rounded"
                    height="130px"
                  />
                ))
            : statsMap.map((data, index) => {
                return (
                  <div
                    className="rounded-lg border p-5"
                    key={index}
                    style={{ background: data.color }}
                  >
                    <div className="flex mb-10">
                      <data.icon color="black" />
                      <span className="ml-2">{data.type}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold">
                        {getAmount(data.amount)}
                      </span>
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
                labels: analytics?.map?.((a) => a?._id),
                values: analytics?.map((a) => a.totalCount),
              },
              title: "Daily Reports",
            }}
          />
          <div className="lg:w-[450px] w-full md:mt-0 my-10 lg:h-[200px] h-full">
            <h2 className="md:mt-7 lg:text-left text-center w-full pt- text-[17px] font-[600] tracking-[0.18px]">
              Genders
            </h2>{" "}
            <PieChart
              id="bankDash"
              data={[
                {
                  value: stats?.totalMale || 0,
                  name: loading ? "..." : `${stats?.totalMale || 0} Male`,
                },
                {
                  value: stats?.totalFemale || 0,
                  name: loading ? "..." : `${stats?.totalFemale || 0} Female`,
                },
                {
                  value: stats?.totalNonBinary || 0,
                  name: loading
                    ? "..."
                    : `${stats?.totalNonBinary || 0} Non-binary`,
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
                  <Typography fontFamily={"Lota"}>All Reports</Typography>
                  {reports.length > 0 && (
                    <Link
                      to={routes.report}
                      className="z-10 text-[var(--c-primary-0)] font-[Lota]"
                    >
                      See All{" "}
                      <ArrowForwardIcon
                        className="text-[var(--c-primary-0)]"
                        fontSize="small"
                      />
                    </Link>
                  )}
                </Box>

                {modalLoading && reports.length === 0 ? (
                  <TablePreloader />
                ) : (
                  <div className="md:w-full mb-10 w-[93vw]">
                    <Table
                      {...{
                        // setPagination,
                        data,
                        pagination: { ...pagination, hidden: true },
                        // setPagination: (d) => dispatch(setPagination(d)),
                        isLoading: modalLoading,
                        tableMsg: [
                          "No User created,",
                          "Kindly check back later.",
                        ],
                      }}
                    />
                  </div>
                )}
              </Container>
            </div>
          </Box>
        </div>
      </div>
    </HomeLayout>
  );
}
