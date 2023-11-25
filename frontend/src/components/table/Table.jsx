/* eslint-disable react/prop-types */
import React from "react";
import Pagination from "./Pagination";
import Loader from "../Loader/Loader";
import Dropdown from "../Dropdown";
import { getByStatusText } from "../../utils/color.util";
import { validateEmail } from "../../utils/helper";
// import { IBrand, IEmptyState } from "../../utils/icons.utils";
import { Avatar } from "@mui/material";

export default function Table({
  checkData,
  data,
  dropdownMenu,
  pagination,
  setPagination,
  colorizeStatus,
  openModal,
  isLoading = false,
  _clickedRowData,
  tableMsg = [],
  checkbox = { text: "Bulk Delete", action: undefined },
}) {
  const keys = data?.length ? Object.keys(data[0]) : [];
  const firstTHName = keys.filter((d) => !d.startsWith("_"))[0];
  return (
    <div className="flow-root">
      <div className="table-container -mx-4 -my-4 px-4 overflow-x-auto sm:-mx-lg:-mx-">
        <div className="rounded-lg inline-block min-w-full py-2 align-middle ">
          <table className="min-w-full border-separate border-spacing-y-2 ">
            <thead className="border-spacing-y-20">
              <tr className="left-10 ">
                {keys.map((name, i) => {
                  return (
                    !name.startsWith("_") && (
                      <th
                        scope="col"
                        key={i}
                        className={`px-3 py-3.5 text-left  ${
                          checkbox.action === undefined &&
                          checkData === undefined
                            ? ""
                            : "pl-1"
                        }`}
                      >
                        {name}
                      </th>
                    )
                  );
                })}
                {dropdownMenu && keys?.length > 0 && <th>Action</th>}
              </tr>
            </thead>

            {!isLoading &&
              (pagination?.total ? (
                <tbody>
                  {data.map((res, index) => {
                    return (
                      <tr className={`mt-5 bg-white`} key={index}>
                        {keys.map((name, i) => {
                          const value = res[name];
                          const _clickable =
                            res._clickable && res._clickTarget === value;
                          const style = getByStatusText(value, colorizeStatus);
                          return (
                            !name.startsWith("_") && (
                              <td
                                key={res._id + "_" + i}
                                className={`whitespace-nowrap px-3 py-4 td truncate  ${
                                  validateEmail(value) ? "" : "capitalize"
                                }`}
                              >
                                <>
                                  {typeof value == "string" &&
                                  (value.startsWith("https") ||
                                    value.startsWith("http") ||
                                    value.startsWith("/")) ? (
                                    // 	<img
                                    // className={`${((checkbox.action===undefined && checkData===undefined) &&name === firstTHName) ? 'ml-0':''}`}
                                    // 	src={value}
                                    // 	style={{
                                    // 		width: "50px",
                                    // 		height: "50px",
                                    // 		borderRadius: "45px",
                                    // 	}}
                                    // 	alt={window.location.pathname.substring(1)}
                                    // />
                                    //
                                    <Avatar
                                      src={value}
                                      className={`${
                                        checkbox.action === undefined &&
                                        checkData === undefined &&
                                        name === firstTHName
                                          ? "ml-0"
                                          : ""
                                      } border bg-transparent`}
                                    >
                                      <img src={"/logo.png"} alt="brand" />
                                    </Avatar>
                                  ) : (
                                    <span
                                      onClick={
                                        _clickable
                                          ? () => {
                                              _clickedRowData(res._data);
                                              openModal(true);
                                            }
                                          : () => {}
                                      }
                                      className={`${
                                        Object.keys(style)?.length
                                          ? "py-1 px-2 rounded"
                                          : ""
                                      } ${_clickable ? "cursor-pointer" : ""} ${
                                        checkbox.action === undefined &&
                                        checkData === undefined &&
                                        name === firstTHName
                                          ? "ml-1"
                                          : ""
                                      }`}
                                      style={{ ...style }}
                                    >
                                      {value}
                                    </span>
                                  )}
                                </>
                              </td>
                            )
                          );
                        })}

                        {dropdownMenu && (
                          <td className="items-center flex justify-center">
                            <Dropdown
                              {...{ menu: dropdownMenu, rowProp: res }}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                ""
              ))}
          </table>
        </div>
        {isLoading && (
          <div className="flex my-5 items-center justify-center w-full">
            <Loader />
          </div>
        )}
        {!isLoading && !pagination?.total && pagination?.search ? (
          <div className="flex my-5 items-center justify-center w-full">
            <h3 className="text-center">No record found</h3>
          </div>
        ) : (
          !isLoading &&
          !pagination?.total && (
            <div className="text-center py-20 bg-[#EAEAEA4D]">
              <div className="flex justify-center mt-0 items-center flex-col">
                <img src="/logo.png" className="my-0 py-0" alt="empty state" />
                <h3 className="text-center mb-1 text-2xl">
                  {" "}
                  {tableMsg[0] || "No record"}
                </h3>
                <p className="leading-5 text-[#71717A] text-lg">
                  {tableMsg[1] ||
                    "No record found for this page at the moment."}
                </p>
              </div>
            </div>
          )
        )}
        {!pagination?.hidden && (
          <>
            {pagination?.total ? (
              <div
                className={`w-full my-10 rounded-b-lg  bg-white py-3 pl-3 ${
                  isLoading ? "visible" : "visible"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p
                    className="text-sm"
                    style={{ color: "var(--C_blue_light)" }}
                  >
                    Showing{" "}
                    <span>
                      {Math.min(pagination?.length, pagination?.total) ||
                        pagination.pageSize}
                    </span>{" "}
                    {pagination?.total > 1 ? "results" : "result"} of{" "}
                    <span>{pagination?.total}</span>{" "}
                    {pagination?.total > 1 ? "records" : "record"}
                  </p>

                  <Pagination
                    {...{
                      page: pagination?.page - 1,
                      itemsPerPage: pagination?.pageSize,
                      setPagination,
                      total: pagination?.total,
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
