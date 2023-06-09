// open source code from https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.js

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MobileFooter from '../components/MobileFooter';
import { BsFillHouseHeartFill } from "react-icons/bs";
import { pink } from "@mui/material/colors";

const theme = createTheme();

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validation criteria is from A3
  function validate_username() {
    if (/^[a-zA-Z0-9_]{6,}$/.test(username.trim())) {
      setUsernameError('');
      return true;
    } else {
      setUsernameError('Username is invalid');
      return false;
    }
  }

  function validate_first_name() {
    if (firstName.trim().length > 0) {
      setFirstNameError('');
      return true;
    } else {
      setFirstNameError('First name is required');
      return false;
    }
  }

  function validate_last_name() {
    if (lastName.trim().length > 0) {
      setLastNameError('');
      return true;
    } else {
      setLastNameError('Last name is required');
      return false;
    }
  }

  function validate_email() {
    if (/^(?!.*\.{2})[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Email is invalid');
      return false;
    }
  }

  function validate_password() {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password.trim())) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('Password is invalid');
      return false;
    }
  }

  function validate_form() {
    return validate_username() && validate_first_name() && validate_last_name() && validate_email() && validate_password()
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };

    if (validate_form()) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8000/accounts/register/');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log('Signup successful');
            // Redirect to login page
            window.location.href = '/login';
          } else {
            console.error('Error signing up:', xhr.statusText);
          }
        }
      };

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(userData));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <BsFillHouseHeartFill size={40} color={pink[500]} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                error={usernameError.length > 0}
                helperText={usernameError}
                onBlur={(event) => {
                  setUsername(event.target.value);
                  validate_username();
                }}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameError.length > 0}
                  helperText={firstNameError}
                  onBlur={(event) => {
                    setFirst(event.target.value);
                    validate_first_name();
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  error={lastNameError.length > 0}
                  helperText={lastNameError}
                  onBlur={(event) => {
                    setLast(event.target.value);
                    validate_last_name();
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  error={emailError.length > 0}
                  helperText={emailError}
                  onBlur={(event) => {
                    setEmail(event.target.value);
                    validate_email();
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  error={passwordError.length > 0}
                  helperText={passwordError}
                  onBlur={(event) => {
                    setPassword(event.target.value);
                    validate_password();
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: pink[500] }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Container maxWidth="xl" sx={{ mb: 3 }}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex' },
            }}
          >
            <MobileFooter />
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
export default Register;