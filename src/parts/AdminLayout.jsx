import * as React from "react";
import UserAvatar from "../assets/images/UserAvatar.png";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Menu, MenuItem } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Avatar } from "@mui/material";
import { Adminprovider } from "./Adminprovider";
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import AdminChangePasswordModel from "../components/modals/AdminModals/AdminChangePasswordModel";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: "25px",
  width: "82%",
  boxShadow: "none",
}));

const AdminLayout = () => {
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

  const navigate = useNavigate();

  function logOutFunction() {
    if (window.confirm('Are you sure want to logout')) {
      localStorage.removeItem('admin_login')
      navigate('/admin')
    }

  }

  const [showChangePassword, setShowChangePassword] = React.useState(false)
  function handleCloseChangePassword() {
    setShowChangePassword(false)
  }
  return (
    <>
      <AdminChangePasswordModel open={showChangePassword} close={handleCloseChangePassword} />
      <Adminprovider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar className="goAdminToolBar">
              <IconButton onClick={handleClickFilter} color="inherit" aria-label="open drawer" edge="end">
                <Avatar />
              </IconButton>
              <Menu
                anchorEl={anchorElFilter}
                id="account-menu"
                open={openFilter}
                onClose={handleCloseFilter}
                onClick={handleCloseFilter}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => setShowChangePassword(true)}>
                  <LockResetIcon /> &nbsp;Change Password
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => logOutFunction()}>
                  <LogoutIcon /> &nbsp; Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <AdminSidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginTop: 'calc(0% + 64px)', //"4.5%",
              width: "calc( 100% - 240px )",
            }}
          >
            {/* <DrawerHeader /> */}
            <Outlet />
          </Box>
        </Box>
      </Adminprovider>
    </>
  );
};

export default AdminLayout;
