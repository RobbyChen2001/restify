import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ProfileSettings from './ProfileSettings';

import { Link as RouterLink } from 'react-router-dom';

function loggedIn() {
  return localStorage.getItem("access_token") != null;
}

async function refreshAccessToken() {
  const url = 'http://localhost:8000/accounts/api/token/refresh/';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ "refresh": localStorage.getItem('refresh_token') }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  console.log("data", data)
  localStorage.setItem('access_token', data.access);
}

// Handle logging out
function handleLogout() {
  refreshAccessToken().then(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/accounts/logout/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Logout was successful, clear local storage and redirect user to login page
        localStorage.clear();
        window.location.href = "/login";
      } else {
        console.log(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify({ "refresh_token": localStorage.getItem("refresh_token") }));
  });
};

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ProfileSettings />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
          <Avatar /> My Account
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/notification">
          <ListItemIcon>
            <NotificationsIcon fontSize="small" />
          </ListItemIcon>
          Notifications
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} component={RouterLink} to="/reservations">
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          My Reservations
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/propertyhost">
          <ListItemIcon>
            <AddBusinessIcon fontSize="small" />
          </ListItemIcon>
          My Hostings
        </MenuItem>
        {loggedIn() ? (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} component={RouterLink} to="/register">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Signup
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
