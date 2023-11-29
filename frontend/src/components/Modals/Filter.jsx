/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { Box } from "@mui/material";
import countries from "../../utils/countries";
import { useDispatch } from "react-redux";
import { clearFilter, getReport } from "../../features/dashboardSlice";
import { setPagination } from "../../features/dashboardSlice";

// eslint-disable-next-line react/prop-types
export default function FilterModal({ open, setOpen, pagination }) {
  const dispatch = useDispatch();
  const handleFilter = (value, name) => {
    dispatch(
      setPagination({ filter: { ...pagination.filter, [name]: value } })
    );
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Filter By:</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
              Promise.all([dispatch(getReport({}))]);
            }}
          >
            <Box spacing={2} className="gap-5 grid md:grid-cols-2 ">
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="gender"
                  value={pagination.filter.gender}
                  onChange={(e, value) => handleFilter(value, "gender")}
                  sx={{ minWidth: 150 }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="non-binary">Non-binary</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="country"
                  value={pagination.filter.country}
                  onChange={(e, value) => handleFilter(value, "country")}
                  sx={{ minWidth: 150 }}
                >
                  {countries.map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="isSent"
                  value={pagination.filter.isSent}
                  onChange={(e, value) => handleFilter(value, "isSent")}
                  sx={{ minWidth: 150 }}
                >
                  <Option value={true}>Sent</Option>
                  <Option value={false}>Unsent</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Via</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="via"
                  value={pagination.filter.via}
                  onChange={(e, value) => handleFilter(value, "via")}
                  sx={{ minWidth: 150 }}
                >
                  <Option value="mail">Mail</Option>
                  <Option value="whatsapp">WhatsApp</Option>
                </Select>
              </FormControl>
              <Button className="md:order-1" type="submit">
                Apply
              </Button>
              <Button
                type="clear"
                color="neutral"
                onClick={() => dispatch(clearFilter())}
              >
                Clear
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
