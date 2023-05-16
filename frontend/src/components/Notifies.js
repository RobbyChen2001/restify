import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import NotificationsIcon from "@mui/icons-material/Notifications";

// import { notifies as inbox } from "../data/mock-data";

import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from "@mui/material";

//check notifies length
// console.log(inbox.length);
// print notifies
// console.log(inbox);

export default function Notifies() {
  const [notifies, setNotifies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notifications/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.json())
    .then((data) => setNotifies(data));
  }, []);

  const deleteNotif = (id) => {
    fetch(`http://localhost:8000/notifications/delete/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(() => {
      const updatedNotifies = notifies.filter((msg) => msg.id !== id);
      setNotifies(updatedNotifies);
    })
    .catch((error) => console.log(error));
  };

  if (!notifies.length) {
    return (
      <Typography
        sx={{
          ml: 1,
          mt: 2,
          color: (theme) => theme.palette.main,
          fontSize: "20px",
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
        component="h3"
      >
        There are no notifies
      </Typography>
    );
  }
  return (
    <Box sx={{ mx: 2, justifyContent: "center", display: "flex" }}>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {notifies.map((msg) => {
          return (
            <React.Fragment>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <NotificationsIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={msg.datetime.substring(0, 10)}
                  secondary={<React.Fragment>{msg.message}</React.Fragment>}
                />
                <IconButton onClick={() => deleteNotif(msg.id)}>
                  <DoneIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
