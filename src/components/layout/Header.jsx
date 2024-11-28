import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/colors";

import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth.js";
import { setIsMobileMenu, setIsSearch } from "../../redux/reducers/extra.js";
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroups"));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isSearch} = useSelector(state => state.extra);

  const[isGroup, setIsGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);



  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
    // console.log("Mobile Menu Clicked");
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    setIsGroup(prev => !prev);
  };
  const openNotification = () => {
    setIsNotification(prev => !prev);
  }

  const navigateToGroup = ()=>navigate("/groups");

  const logoutHandler = async()=>{
    try {
      const {data} =  await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials:true
      });
      dispatch(userNotExists());
      toast.success(data.message);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }

  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            {/* App Title */}
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              BaatCheet-ChatSpace
            </Typography>


            {/* Mobile Menu Icon */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

                {/* Empty box to push icons to the right side */}
            <Box sx={{ flexGrow: 1 }}></Box>

            <Box>
              {/* Search Icon */}
              <Tooltip title="Search">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openSearchDialog}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {/* New Group Icon */}
              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

                {/* navigate to groups */}
              <Tooltip title='Manage Groups'>
                <IconButton color='inherit' size='large' onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>
              </Tooltip>

              {/* Notification Icon */}
              <Tooltip title='Notification'>
                <IconButton color='inherit' size='large' onClick={openNotification}>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>

                {/* Logout Icon */}
              <Tooltip title = 'logout'>
                <IconButton color='inherit' size='large'  onClick={logoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

    {
      isSearch && <Suspense fallback={<Backdrop open />}><SearchDialog/></Suspense>
      
    }
    {
      isGroup && <Suspense fallback={<Backdrop open />}><NewGroupDialog/></Suspense>
    }
    {
      isNotification && <Suspense fallback={<Backdrop open />}><NotificationDialog/></Suspense>
    }

    </>
  );
}

export default Header;
