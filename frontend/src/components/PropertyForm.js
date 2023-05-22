import React from "react";

import Container from "@mui/material/Container";
import { Box, CssBaseline } from "@mui/material";
import { displayOnDesktop } from "../themes/CommonStyle";

import { makeStyles } from "@material-ui/core";
import PropertyFormDetails from "../components/PropertyFormDetails";
import AccountProfile from "./AccountProfile";
import Button from "@mui/material/Button";

function PropertyForm() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "80%",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            mb: 3,
            flex: 1, // Add flex: 1 to make the Container component expand to fill its parent
          }}
        >
          <PropertyFormDetails/>
          
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default PropertyForm;
