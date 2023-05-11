import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { pink } from "@mui/material/colors";
import { IoSearchCircleSharp } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';


import AmenitiesMenu from "./AmenitiesMenu";


const Search = () => {
  return (
    <Paper
      component="form"
      sx={{
        borderRadius: 20,
        ml: 1,
        mt: 2,
        mb: 2,
      }}
      elevation={3}
    >
      <Stack 
      divider={<Divider orientation="vertical" flexItem />}
      >
        <TextField
          id="Location-input"
          label="Location"
          variant="standard"
          InputLabelProps={{
            sx: {
              fontWeight: "bold",
              color: (theme) => theme.palette.text.primary,
              fontSize: "14px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              width: "70px",
              fontSize: "14px",
            },
          }}
          sx={{
            ml: 1,
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            id="Check-in"
            label="Check-in"
            slotProps={{ textField: { fontSize: "14px" } }}
            sx={{
              width: "150px",
              label: {
                fontWeight: "bold",
                color: (theme) => theme.palette.text.primary,
                fontSize: "14px",
              },
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            id="Check-out"
            label="Check-out"
            slotProps={{ textField: { fontSize: "14px" } }}
            sx={{
              view: { fontSize: "14px" },
              width: "150px",
              label: {
                fontWeight: "bold",
                color: (theme) => theme.palette.text.primary,
                fontSize: "14px",
              },
            }}
          />
        </LocalizationProvider>

        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <TextField
            id="Guest-input"
            label="Guest"
            variant="standard"
            InputLabelProps={{
              sx: {
                fontWeight: "bold",
                color: (theme) => theme.palette.text.primary,
                fontSize: "14px",
              },
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                width: "40px",
                mb: 1,
              },
            }}
          />
          

          <AmenitiesMenu id="amenities"/>
          

          <IconButton type="submit" sx={{ p: '10px' }}>
            <IoSearchCircleSharp color={pink[500]} size={36} />
          </IconButton>

        </Box>
      </Stack>
    </Paper>
  );
};

export default Search;
