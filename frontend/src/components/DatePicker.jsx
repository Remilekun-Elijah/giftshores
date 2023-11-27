/* eslint-disable react/prop-types */
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({
  required = false,
  endDate = new Date(),
  maxDate = new Date(),
  selected = new Date(),
  showYearPicker = false,
  isClearable = false,
  onChange,
  className,
  ...others
}) => {
  return (
    <ReactDatePicker
      {...{
        required,
        className: className
          ? className + "z-10 cursor-pointer focus:outline-none"
          : "w-full py-3 px-1 cursor-pointer text-gray-700 leading-tight focus:outline-none z-10 focus:shadow-outline shadow rounded border border-[purple]",
        selected,
        endDate,
        onChange,
        maxDate,
        isClearable,
        showYearPicker,
        placeholderText: "Filter by Date",
        ...others,
      }}
    />
  );
};

export default DatePicker;
