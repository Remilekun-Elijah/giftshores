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
import DateRangePicker from "../components/DatePicker";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadModal from "../components/Modals/Download";
import ViewModal from "../components/Modals/View";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import Storage from "../utils/storage";

const Report = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate();

  const {
      modalLoading,
      pagination,

      reports,
    } = useSelector(getDashboardData),
    [selectedData, setSelectedData] = useState({}),
    [open, setOpen] = useState(false),
    [open1, setOpen1] = useState(false),
    [open2, setOpen2] = useState(false);

  useEffect(() => {
    dispatch(setPagination({ page: 1, endDate: null }));

    const nav = Storage.get(config.authProps[0]);
    if (nav === null) navigate("/");
  }, []);

  useEffect(() => {
    let cb = () => {};
    if (pagination?.search) {
      dispatch(setPagination({ page: 1 }));
      cb = setTimeout(() => Promise.all([dispatch(getReport({}))]), 700);
    } else cb = Promise.all([dispatch(getReport({}))]);

    return () => {
      clearTimeout(cb);
    };
  }, [
    pagination.page,
    pagination.search,
    pagination.startDate && pagination.endDate,
  ]);

  const data = reports?.map((report) => {
    const { createdAt, owner, isSent, via } = report;
    return {
      name: owner.firstName + " " + owner.lastName,
      email: owner?.email || "N/A",
      gender: owner.gender ? capitalize(owner.gender) : "N/A",
      country: owner.country || "N/A",
      via: via ? capitalize(via) : "N/A",
      "Date Created": dayjs(createdAt).format("MMM DD, YYYY"),
      Status: isSent ? "Sent" : "Not Sent",
      _data: report,
    };
  });

  const setDate = (date) => {
    const [start, end] = date;
    dispatch(setPagination({ page: 1, startDate: start, endDate: end }));
  };

  const dropdownData = {
    visible: true,
    type: "icon",
    icon: <VisibilityIcon className="z-20" />,
    action: (_, state) => {
      setSelectedData(state?._data);
      setOpen2(true);
    },
  };

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

        <div className="lg:grid lg:grid-cols-2 mb-8">
          <div className="col-span-1 lg:mb-0 mb-6">
            <SearchBar
              {...{
                value: pagination.search,
                onChange: ({ target: { value } }) =>
                  dispatch(setPagination({ page: 1, search: value.trim() })),
                placeholder: "Search by name...",
              }}
            />
          </div>
          <div className="grid xl:grid-cols-3 grid-cols-2 flex-wrap gap-5 items-center col-span-1">
            <Button
              startIcon={<FilterAltIcon />}
              onClick={() => setOpen(true)}
              sx={{
                textTransform: "capitalize",
                py: "22px",
                bgcolor: "purple",
                color: "white",
                "&:hover": { bgcolor: "purple" },
              }}
              variant="contained"
              size="small"
              className="h-[40px] z-10 font-[500] md:text-[15px] text-[10px] rounded"
            >
              {" "}
              FILTER
            </Button>

            <Button
              startIcon={<CloudDownloadIcon />}
              onClick={() => setOpen1(true)}
              sx={{
                textTransform: "capitalize",
                py: "22px",
                bgcolor: "#C298B4",
                border: "1px solid purple",
                color: "white",
                "&:hover": { bgcolor: "purple", color: "white" },
              }}
              variant="contained"
              size="small"
              className="h-[40px] border-2 border-[purple] z-10 font-[500] md:text-[15px] text-[10px] rounded"
            >
              {" "}
              DOWNLOAD
            </Button>

            <div className="z-10">
              <DateRangePicker
                selected={pagination.startDate}
                onChange={setDate}
                startDate={pagination.startDate}
                endDate={pagination.endDate}
                selectsRange
                isClearable={true}
              />
            </div>
          </div>
        </div>

        {modalLoading && reports.length === 0 ? (
          <TablePreloader />
        ) : (
          <div className="md:w-full w-[93vw]">
            <CustomTable
              {...{
                data,
                pagination,
                setPagination: (d) => dispatch(setPagination(d)),
                isLoading: modalLoading,
                action: dropdownData,
              }}
            />
          </div>
        )}
      </div>

      <FilterModal {...{ open, setOpen, pagination }} />
      <DownloadModal {...{ open: open1, setOpen: setOpen1, pagination }} />
      <ViewModal {...{ open: open2, setOpen: setOpen2, data: selectedData }} />
    </HomeLayout>
  );
};

export default Report;
