import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";



import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";

import AppThemeProvider from '../themes/AppThemeProvider';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AccountProfile = () => {
  const classes = useStyles();
  // const [firstName, setFirstName] = useState("John");
  // const [lastName, setLastName] = useState("Doe");
  // const [email, setEmail] = useState("john.doe@example.com");
  // const [phone, setPhone] = useState("(555) 555-5555");

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

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

  useEffect(() => {
    refreshAccessToken().then(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8000/accounts/update/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      };
  
      fetchData();
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/accounts/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div className={classes.root}>
      <Box sx={{ mt: 2, mx: 2, justifyContent: "center", display: "flex" }}>
        <Stack direction="column" spacing={2} component="form"
          divider={<Divider orientation="vertical" flexItem />}>
          <Tooltip title="Change Profile Picture">

            <Button
              aria-label="change profile picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <Avatar
                alt={formData.first_name}
                src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                sx={{ width: 200, height: 200 }}
              />
            </Button>
          </Tooltip>

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="first-name"
              label="First Name"
              value={formData.first_name}
              variant="standard"
              onChange={(event) => setFormData({...formData, first_name: event.target.value})}
            />
            <TextField
              id="last-name"
              label="Last Name"
              value={formData.last_name}
              variant="standard"
              onChange={(event) => setFormData({...formData, last_name: event.target.value})}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              variant="standard"
              onChange={(event) => setFormData({...formData, email: event.target.value})}
            />
            <TextField
              id="phone"
              label="Phone Number"
              value={formData.phone}
              variant="standard"
              onChange={(event) => setFormData({...formData, phone: event.target.value})}
            />
            <Button
              className={classes.button}
              type="submit"
              sx={{
                ripple: false,
                ml: 1,
                mt: 2,
                color: 'black',
                fontSize: '23px',
                fontWeight: 'bold',
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </form>
        </Stack>
      </Box>
    </div>
  );
};


export default AccountProfile;
