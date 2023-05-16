// open source code from https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-in/SignIn.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/accounts/login/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('access_token', response.access);

        // Redirect to home page
        window.location.href = '/';
      }
      else {
        console.error(xhr.statusText);
        alert('Login failed. Please try again.');
      }
    };
    xhr.onerror = function () {
      console.error(xhr.statusText);
      alert('Login failed. Please try again.');
    };
    xhr.send(JSON.stringify(userData));
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
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: pink[500] }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <MobileFooter />
      </Container>
    </ThemeProvider>
  );
}
export default Login;