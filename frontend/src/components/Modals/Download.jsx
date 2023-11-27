/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Switch, { switchClasses } from "@mui/joy/Switch";
import FormHelperText from "@mui/joy/FormHelperText";
import dayjs from "dayjs";
import config from "../../utils/config";

export default function DownloadModal({ open, setOpen, pagination }) {
  const [checked, setChecked] = React.useState(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Download Reports</DialogTitle>
          <DialogContent className="text-sm">
            <strong>Note:</strong> Filter will be applied if available.
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const {
                pageSize,
                search,
                startDate,
                endDate,
                filter: { via, isSent, gender, country },
              } = pagination;

              const api = config.backendUrl.endsWith("/")
                ? config.backendUrl
                : config.backendUrl + "/";
              let url = `
              ${api}admin/report/?download=true&pageSize=${
                checked ? null : event.target.pageSize.value || pageSize
              }&search=${search || ""}&gender=${gender || ""}&country=${
                country || ""
              }&isSent=${isSent === null ? "" : isSent}&via=${via || ""}`;
              if (startDate && endDate) {
                url =
                  url +
                  `&startDate=${
                    startDate ? dayjs(startDate).toISOString() : ""
                  }&endDate=${endDate ? dayjs(endDate).toISOString() : ""}`;
              }

              window.open(url);
            }}
          >
            <Stack spacing={2} className="gap- ">
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  autoFocus
                  name="pageSize"
                  placeholder={`Default ${pagination.pageSize}`}
                  disabled={checked}
                />
              </FormControl>
              <FormControl>
                <div>
                  <FormLabel>All Reports</FormLabel>
                  <FormHelperText sx={{ mb: 1 }}>
                    Download all {pagination.total && pagination.total} reports.
                  </FormHelperText>
                  <Switch
                    name="all"
                    checked={checked}
                    endDecorator={checked ? "Yes" : "No"}
                    onChange={(event) => setChecked(event.target.checked)}
                    sx={(theme) => ({
                      "--Switch-thumbShadow": "0 3px 7px 0 rgba(0 0 0 / 0.12)",
                      "--Switch-thumbSize": "27px",
                      "--Switch-trackWidth": "51px",
                      "--Switch-trackHeight": "31px",
                      "--Switch-trackBackground":
                        theme.vars.palette.background.level3,
                      [`& .${switchClasses.thumb}`]: {
                        transition: "width 0.2s, left 0.2s",
                      },
                      "&:hover": {
                        "--Switch-trackBackground":
                          theme.vars.palette.background.level3,
                      },
                      "&:active": {
                        "--Switch-thumbWidth": "32px",
                      },
                      [`&.${switchClasses.checked}`]: {
                        "--Switch-trackBackground": "rgb(48 209 88)",
                        "&:hover": {
                          "--Switch-trackBackground": "rgb(48 209 88)",
                        },
                      },
                    })}
                  />
                </div>
              </FormControl>

              <Button type="submit">Download</Button>
              <Button
                type="clear"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
