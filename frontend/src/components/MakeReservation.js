import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsFillHouseHeartFill } from "react-icons/bs";
import { pink } from "@mui/material/colors";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import NightShelterIcon from '@mui/icons-material/NightShelter';

const theme = createTheme();

const MakeReservation = () => {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirst] = useState("");
//   const [lastName, setLast] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [usernameError, setUsernameError] = useState("");
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // Validation criteria is from A3
//   function validate_username() {
//     if (/^[a-zA-Z0-9_]{6,}$/.test(username.trim())) {
//       setUsernameError("");
//       return true;
//     } else {
//       setUsernameError("Username is invalid");
//       return false;
//     }
//   }

//   function validate_first_name() {
//     if (firstName.trim().length > 0) {
//       setFirstNameError("");
//       return true;
//     } else {
//       setFirstNameError("First name is required");
//       return false;
//     }
//   }

//   function validate_last_name() {
//     if (lastName.trim().length > 0) {
//       setLastNameError("");
//       return true;
//     } else {
//       setLastNameError("Last name is required");
//       return false;
//     }
//   }

//   function validate_email() {
//     if (
//       /^(?!.*\.{2})[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
//         email
//       )
//     ) {
//       setEmailError("");
//       return true;
//     } else {
//       setEmailError("Email is invalid");
//       return false;
//     }
//   }

//   function validate_password() {
//     if (
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
//         password.trim()
//       )
//     ) {
//       setPasswordError("");
//       return true;
//     } else {
//       setPasswordError("Password is invalid");
//       return false;
//     }
//   }

//   function validate_form() {
//     return (
//       validate_username() &&
//       validate_first_name() &&
//       validate_last_name() &&
//       validate_email() &&
//       validate_password()
//     );
//   }

  const handleSubmit = (event) => {
    event.preventDefault();

    // const userData = {
    //   username: username,
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   password: password,
    // };
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BsFillHouseHeartFill size={40} color={pink[500]} />
          <Typography component="h1" variant="h5">
            Make a Reservation
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mr: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    id="Check-in"
                    label="Check-in"
                    slotProps={{ textField: { fontSize: "14px" } }}
                    sx={{
                      width: "100%",
                      label: {
                        fontWeight: "bold",
                        color: (theme) => theme.palette.text.primary,
                        fontSize: "14px",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    id="Check-out"
                    label="Check-out"
                    slotProps={{ textField: { fontSize: "14px" } }}
                    sx={{
                      view: { fontSize: "14px" },
                      width: "100%",
                      label: {
                        fontWeight: "bold",
                        color: (theme) => theme.palette.text.primary,
                        fontSize: "14px",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} xd={8} >
                <TextField
                  id="Guest-input"
                  label="Guest"
                  fullWidth
                  InputLabelProps={{
                    sx: {
                      fontWeight: "bold",
                      color: (theme) => theme.palette.text.primary,
                      fontSize: "14px",
                    },
                  }}
                />
              </Grid>


              {/* <Grid item xs={12}>
                
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError.length > 0}
                  helperText={passwordError}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    validate_password();
                  }}
                />
              </Grid> */}


            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: pink[500] }}
            >
              Reserve
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MakeReservation;