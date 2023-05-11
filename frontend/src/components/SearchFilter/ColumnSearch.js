import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";



const ColumnSearch = () => {
  return (
      <Stack 
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ xs: 'column', sm: 'row' }}
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
        </Box>
      </Stack>
  );
};

export default ColumnSearch;
