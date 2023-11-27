/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { getByStatusText } from "../../utils/color.util";
import dayjs from "dayjs";

export default function SizeModalDialog({ open, setOpen, data }) {
  console.log(data);

  const mapData = (items) => {
    return items?.length > 0
      ? items?.map((item, idx) => {
          const notLast = idx + 1 !== items?.length;
          const secondToLast = idx + 1 === items?.length - 1;
          return (
            <div key={idx} className="">
              <span
                className={`${
                  secondToLast ? "ml- inline-block" : ""
                } capitalize`}
              >
                {item}
              </span>
              <span
                className={`${
                  secondToLast ? "mx-2 inline-block" : "mr-2"
                } lowercase`}
              >
                {secondToLast ? "and" : notLast ? "," : ""}
              </span>
            </div>
          );
        })
      : "N/A";
  };
  const status = data?.isSent ? "Sent" : "Not sent";
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size={"md"} className="w-full" maxWidth={"500px"}>
          <ModalClose />
          <DialogTitle className="border-b">Report Details</DialogTitle>
          {/* <DialogContent>This is a `Medium` modal dialog.</DialogContent> */}

          <Stack spacing={2}>
            <div className="flex justify-between w-full">
              <p className="font-[600]">Name</p>
              <p>
                {data?.owner?.firstName || "N/A"}{" "}
                {data?.owner?.lastName || "N/A"}
              </p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Email</p>
              <p>{data?.owner?.email || "N/A"}</p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Gender</p>
              <p className="capitalize">{data?.owner?.gender || "N/A"}</p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Country</p>
              <p>{data?.owner?.country || "N/A"}</p>
            </div>

            <div className="flex justify-between w-full flex-wrap">
              <p className="font-[600]">Gifts</p>
              <div className="flex flex-wrap">{mapData(data.gifts)}</div>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Purpose</p>
              <p>{data?.purpose || "N/A"}</p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Status</p>
              <p>
                <span
                  className="px-3 py-2 rounded-full"
                  style={{ ...getByStatusText(status) }}
                >
                  <span
                    id="circle__"
                    className="rounded-full inline-block mr-2 whitespace-nowrap"
                    style={{
                      border: `4px solid ${getByStatusText(status).color}`,
                    }}
                  ></span>

                  {status}
                </span>
              </p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Sent Via</p>
              <p className="capitalize">{data?.via || "N/A"}</p>
            </div>

            <div className="flex justify-between w-full">
              <p className="font-[600]">Date Created</p>
              <p className="capitalize">
                {dayjs(data.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>

            <br />
            <div className="flex justify-between w-full flex-wrap">
              <p className="font-[600]">Receivers</p>
              <div className="flex flex-wrap">{mapData(data?.recipients)}</div>
            </div>
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
