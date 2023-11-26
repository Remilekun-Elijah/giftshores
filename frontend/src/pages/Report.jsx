/* eslint-disable react-hooks/exhaustive-deps */
import TablePreloader from "../components/Loader/TablePreloader";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  getReport,
  setPagination,
} from "../features/dashboardSlice";
import HomeLayout from "../layouts/Home";
import { Button, Typography } from "@mui/material";
import CustomTable from "../components/table/Table";
import dayjs from "dayjs";
import { capitalize } from "../utils/helper";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/Modals/Filter";

const Report = () => {
  const dispatch = useDispatch();
  const {
      modalLoading,
      pagination,

      reports,
    } = useSelector(getDashboardData),
    [open, setOpen] = useState(false);

  useEffect(() => {
    Promise.all([dispatch(getReport())]);
  }, [pagination.page]);

  const data = reports?.map(({ createdAt, owner, isSent, via }) => ({
    name: owner.firstName + " " + owner.lastName,
    email: owner?.email || "N/A",
    gender: owner.gender || "N/A",
    country: owner.country || "N/A",
    via: via ? capitalize(via) : "N/A",
    "Date Created": dayjs(createdAt).format("MMM DD, YYYY"),
    Status: isSent ? "Sent" : "Not Sent",
    // _data: user,
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
          Reports
        </Typography>

        <div className="lg:grid lg:grid-cols-3 mb-8">
          <div className="col-span-2 lg:mb-0 mb-6">
            <SearchBar
              {...{
                onChange: () => {},
                placeholder: "Search by name or staff id...",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 items-center col-span-1">
            <Button
              // disabled={loading}
              // component={Link}
              // to={config.routes.uploadUsers}
              onClick={() => setOpen(true)}
              sx={{
                textTransform: "capitalize",
                borderRadius: ".5em",
                p: "0px",
                bgcolor: "#975F94",
                color: "white",
                "&:hover": { bgcolor: "purple" },
              }}
              variant="contained"
              size="small"
              className="h-[42px] z-10 font-[500] md:text-[15px] text-[10px] rounded-[10px] "
            >
              {" "}
              FILTER
            </Button>

            {/* <Button
              disabled={loading}
              component={Link}
              to={config.routes.createUser}
              sx={{
                textTransform: "capitalize",
                borderRadius: ".5em",
                p: "0px",
              }}
              variant="text"
              size="small"
              className="h-[42px] font-[500] md:text-[15px] text-[10px] rounded-[10px] text-white py-0 bg-[#D70900] hover:bg-[#FF5C5C]"
            >
              {" "}
              Create New User
            </Button> */}
          </div>
        </div>

        {modalLoading && reports.length === 0 ? (
          <TablePreloader />
        ) : (
          <div className="sm:w-full w-[93vw]">
            <CustomTable
              {...{
                data,
                pagination,
                setPagination: (d) => dispatch(setPagination(d)),
                isLoading: modalLoading,
                tableMsg: ["No Record created,", "Kindly check back later."],
              }}
            />
          </div>
        )}
      </div>

      <FilterModal {...{ open, setOpen }} />
    </HomeLayout>
  );
};

export default Report;
