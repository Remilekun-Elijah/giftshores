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
// import Add from "@mui/icons-material/Add";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { Box } from "@mui/material";
import countries from "../../utils/countries";

// eslint-disable-next-line react/prop-types
export default function FilterModal({ open, setOpen }) {
  // const [] = React.useState(false);
  return (
    <React.Fragment>
      {/* <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New project
      </Button> */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Apply Filter</DialogTitle>
          <DialogContent>
            Selected values are applied upon submission.
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Box spacing={2} className="gap-5 grid md:grid-cols-2 ">
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="gender"
                  required
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
                  required
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
                  required
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
                  required
                  sx={{ minWidth: 150 }}
                >
                  <Option value="mail">Mail</Option>
                  <Option value="whatsapp">WhatsApp</Option>
                </Select>
              </FormControl>
              <FormControl></FormControl>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
