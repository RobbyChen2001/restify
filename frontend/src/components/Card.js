import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

// react icons
import { AiFillStar } from "react-icons/ai";
import { flexBetween, dFlex, fixedIcon } from "../themes/CommonStyle";
import "./Card.css";

const Card = ({ property }) => {
  console.log('Property in Card:', property);
  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%", height: 250 }}>
        {property.images && (
          <img
            src={property.images} 
            alt={property.location}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography component="h3"> {property.location}</Typography>
          <Typography component="h4"> Guests: {property.num_guests}</Typography>
          <Typography component="h5"> Baths: {property.num_baths}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={dFlex}>
            {property.isNew ? (
              <React.Fragment>
                <Typography component="h5">New</Typography>
                <AiFillStar size={18} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography component="h5"> {property.user}</Typography>
                <AiFillStar size={18} />
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
