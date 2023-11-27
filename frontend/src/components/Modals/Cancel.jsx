import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function CancelModal({
	open,
 loading,
	handleSuccess,
 handleClose,
 btnTexts,
	title,
 subtitle
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
				sx={{zIndex: 5000}}
				TransitionComponent={Transition}>
				<DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>
					<Button className="hidden opacity-0" style={{visibility: 'hidden'}} color="error" onClick={handleClose} autoFocus>
						<Close />
					</Button>
				</DialogActions>
				<DialogContent>
					<Typography textAlign="center" fontSize="32px" style={{fontFamily: "Poppins", fontWeight: "bold"}}>
						{title}
					</Typography>
					<DialogContentText fontSize="20px" padding=".5em 1em" mb={'20px'}>
						{subtitle}
					</DialogContentText>
					<Stack spacing={7} direction="row">
     <LoadingButton
          fullWidth
						sx={{borderRadius: '10px', bgcolor: 'var(--c-primary-1) !important', color: 'var(--c-primary-0)',  '&:hover': {bgcolor: 'var(--c-danger-3) !important', color: 'white'}}}
          size="large"
          variant="text"
										onClick={handleClose}
        >
          <span>{btnTexts[0]}</span>
        </LoadingButton>

     <LoadingButton
          fullWidth
						sx={{".MuiLoadingButton-loadingIndicatorCenter": { color: 'white !important'}
					, borderRadius: '10px', bgcolor: 'var(--c-primary-0) !important', '&:hover': {bgcolor: '#FF5C5C !important'}}}
          size="large"
          loading={loading}
          onClick={handleSuccess}
          variant="contained"
        >
          <span>{btnTexts[1]}</span>
        </LoadingButton>
					</Stack>
				</DialogContent>
			</Dialog>
	);
}
