/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import links from "../../utils/linkTree";
// import { IBrand } from "../../utils/icons.utils";
import SidebarItems from "../../components/Sidebars/SidebarItems";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { logout } from '../../features/auth/authSlice';
import { useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";
import { loggedInUser } from "../../utils/helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 340;

export default function HomeSidebar(props) {
  const { window, children, showNavigation = false } = props;
  const [phoneNumberOpen, setMobileOpen] = React.useState(false),
    [logouts, setLogout] = React.useState(false);
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    handleLogout = () => {
      // dispatch(logout());
      navigate("/");
    },
    handleDrawerToggle = () => {
      setMobileOpen(!phoneNumberOpen);
    },
    user = JSON.parse(loggedInUser);

  const drawer = (
    <div>
      <Toolbar>
        <div className="flex items-end mt-3">
          {/* <Avatar src={IBrand} variant='square' height={'130px'} width={'60px'} className='mt-3 ml-7 rounded bg-transparent'> */}
          <img
            src={"/logo.png"}
            alt="brand"
            className="shadow bg-white p-2 rounded"
            height={"130px"}
            width={"60px"}
          />
          {/* </Avatar> */}
          <h2
            style={{ color: "white" }}
            className="ml-5 text-2xl mt-4 uppercase sofiaProBold"
          >
            GIFTSHORES
          </h2>
        </div>
      </Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      ></IconButton>
      <div className="sm:mt-20 pl-7"></div>
      <List>
        {links.map((link, index) => {
          return <SidebarItems {...{ link }} key={index} />;
        })}
      </List>

      <ListItem sx={{ mt: "4em", position: "absolute", bottom: "2em" }}>
        <ListItemButton onClick={() => setLogout(true)}>
          <ListItemIcon>
            <LogoutIcon style={{ color: "white" }} width={"22px"} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography style={{ color: "white" }}>Logout</Typography>}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="shadow-sm"
        position="fixed"
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "none",
          py: ".5em",
          zIndex: 20,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {showNavigation && (
            <Box className="text-[#201600] flex">
              <span
                className="flex cursor-pointer items-center"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNewIcon
                  color="#201600"
                  className="mx-2"
                  fontSize="small"
                />
                <Typography className="text-[#201600] text-[16px] ">
                  Back
                </Typography>
              </span>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          "& .MuiDrawer-paper": {
            width: { sm: drawerWidth },
            boxSizing: "border-box",
            backgroundColor: "var(--c-primary-0)",
            borderRight: "0px",
          },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={phoneNumberOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on phoneNumber.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--c-primary-0)",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        className=""
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {logouts && (
        <Dialog
          fullScreen={fullScreen}
          open={logouts}
          onClose={() => setLogout(false)}
          aria-labelledby="responsive-dialog-title"
          className="p-20"
          sx={{ zIndex: 5000 }}
          TransitionComponent={Transition}
        >
          <DialogTitle
            id="responsive-dialog-title"
            display="flex"
            justifyContent="center"
            mt="0em"
          ></DialogTitle>
          <DialogContent>
            <Typography textAlign="center" fontSize="32px">
              Log Out
            </Typography>
            <DialogContentText
              fontSize="20px"
              padding=".5em 1em"
              mb={"20px"}
              fontFamily={"Lota"}
            >
              Are you sure you want to logout?
            </DialogContentText>
            <Stack spacing={7} direction="row" className="normal-case">
              <Button
                className="normal-case"
                fullWidth
                sx={{
                  color: "var(--c-primary-0)",
                  borderRadius: "10px",
                  bgcolor: "var(--c-primary-1)",
                  "&:hover": {
                    color: "white",
                    bgcolor: "var(--c-danger-3) !important",
                  },
                }}
                size="large"
                onClick={() => setLogout(false)}
                variant="text"
              >
                <span className="normal-case">Cancel</span>
              </Button>

              <LoadingButton
                className="normal-case"
                fullWidth
                sx={{
                  borderRadius: "10px",
                  bgcolor: "var(--c-primary-0)",
                  color: "white",
                  "&:hover": { background: "#FF5C5C" },
                }}
                size="large"
                variant="contained"
                onClick={handleLogout}
              >
                Log Out
              </LoadingButton>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
