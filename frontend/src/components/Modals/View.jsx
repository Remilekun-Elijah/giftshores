import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewModal({
	open,
 handleClose,
	title,
 data
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				className="p-10"
				sx={{zIndex: 5000, minWidth: '400px'}}
    fullWidth
				TransitionComponent={Transition}>
				<DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
    <Typography textAlign="center" fontSize="32px" style={{fontFamily: "Poppins", fontWeight: "bold"}}>
						{title}
					</Typography>
					<Button color="error" onClick={handleClose} autoFocus>
						<Close />
					</Button>
				</DialogActions>
    <hr />
				<DialogContent>
					
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px' }}>
       <p><span style={{borderBottom: '2px solid red'}}>Full</span> Name</p> <p style={{textTransform: "capitalize"}}>{data?.firstName} {data?.middleName} {data?.lastName}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px', margin: '10px 0'}}>
       <p>Email Address</p> <p>{data?.email  || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px'}}>
       <p>Phone Number</p> <p>{data?.phoneNumber  || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px', margin: '10px 0' }}>
       <p>BVN Number</p> <p>{data?.bvn  || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px' }}>
       <p>Staff ID</p> <p>{data?.staffId  || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px', margin: '10px 0' }}>
       <p>Department</p> <p>{data?.Department?.department  || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px', marginBottom: '10px' }}>
       <p>Gender</p> <p style={{textTransform: "capitalize"}}>{data?.gender || "N/A"}</p>
      </div>
     
      <div style={{ display: 'flex', justifyContent: "space-between", fontSize: '18px', marginBottom: '10px'  }}>
       <p><span style={{borderBottom: '2px solid red'}}>Date</span> Of Birth</p> <p>{data?.dateOfBirth ? dayjs(data?.dateOfBirth).format('MMM DD, YYYY') : 'N/A'}</p>
      </div>
				
				</DialogContent>
			</Dialog>
	);
}
