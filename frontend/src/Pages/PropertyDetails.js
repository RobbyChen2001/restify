import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pink } from "@mui/material/colors";

import Container from "@mui/material/Container";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { displayOnDesktop } from "../themes/CommonStyle";

import NavBar from "../components/NavBar";
import PropertyCardsDisplay from "../components/PropertyCardsDisplay";
import Footer from "../components/Footer";
import FooterMenu from "../components/FooterMenu";
import MobileFooter from "../components/MobileFooter";
import { property as cardLocations } from "../data/mock-data";

import ImageWall from "../components/ImageWall";
import MakeReservation from "../components/MakeReservation";

import { flexBetween, dFlex, fixedIcon } from "../themes/CommonStyle";

import Avatar from "@mui/material/Avatar";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import AccessibilityIcon from "@mui/icons-material/Accessibility";


function PropertyDetails() {
  // const [property, setProperty] = useState(null);
  // const { property_id } = useParams(); // Extract the property_id from the URL

  // // check if getting property_id
  // console.log("property_id: ", property_id);

  // const fetchPropertyDetails = async () => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/properties/${property_id}/`);
  //     const data = await response.json();
  //     setProperty(data);
  //   } catch (error) {
  //     console.error("Error fetching property details:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPropertyDetails();
  // }, []);

  // retrive property details from cardLocations
  
  const [property, setProperty] = useState(null);
  const { property_id } = useParams(); // Extract the property_id from the URL

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/properties/${property_id}/`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  // Update the component JSX to display the property details
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
          <Container
            maxWidth="xl"
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Stack
              sx={{
                mt: 3,
                mb: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                "@media screen and (max-width: 1120px)": {
                  flexDirection: "column",
                },
              }}
            >
              <ImageWall
                itemData={property}
                sx={{ display: "flex", justifyContent: "center" }}
              />

              <MakeReservation />
            </Stack>
            <Divider variant="inset" />

            <Paper
               md={{
                mt: 3,
                mb: 3,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                "@media screen and (max-width: 1120px)": {
                  flexDirection: "column",
                },
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  position: "relative",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      ml: 1,
                      mt: 2,
                      color: (theme) => theme.palette.main,
                      fontSize: "36px",
                      fontWeight: "bold",
                      justifyContent: "center",
                      display: "flex",
                    }}
                    component="h3"
                  >
                    {property ? property.location : "Loading..."}
                  </Typography>

                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      flexDirection: "row",
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: pink[500] }}>
                          <AccessibilityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Guests ${
                          property ? property.num_guests : "Loading..."
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: pink[500] }}>
                          <BedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Beds ${property ? property.num_beds : "Loading..."}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: pink[500] }}>
                          <BathtubIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Baths ${
                          property ? property.num_baths : "Loading..."
                        }`}
                      />
                    </ListItem>
                  </List>
                </Box>
                <Divider variant="inset" />
                <Box sx>
                  <Typography style={{ textTransform: "none" }}>
                    {property ? property.description : "Loading..."}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Divider variant="inset" />
            
            {/* <CommentCards /> */}
           
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

export default PropertyDetails;