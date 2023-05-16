import React from "react";
import Container from "@mui/material/Container";
import { Box, CssBaseline, Divider } from "@mui/material";
import { displayOnDesktop } from "../themes/CommonStyle";
import Typography from "@mui/material/Typography";


import NavBar from "../components/NavBar";
import PropertyCardsDisplay from "../components/PropertyCardsDisplay";
import Footer from "../components/Footer";
import FooterMenu from "../components/FooterMenu";
import MobileFooter from "../components/MobileFooter";

import Notifies from "../components/Notifies";

function Notification() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box>
          <NavBar />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: 100,
            overflowY: "scroll",
          }}
        >
          <Container maxWidth="xl" sx={{ mb: 3 }}>
          
          <Typography
              sx={{
              ml: 1,
              mt: 2,
              color: (theme) => theme.palette.main,
              fontSize: '20px',
              fontWeight: 'bold',
              }}
              component="h2"
              >
              Notifications
          </Typography>
          <Divider sx={{ mb: 1 }} />
          
            <Notifies />

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <MobileFooter />
            </Box>
          </Container>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <FooterMenu />
        </Box>
        <Box sx={displayOnDesktop}>
          <Footer />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Notification;
