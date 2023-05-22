import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";

import UploadImageWall from "../components/UploadImageWall";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Typography } from "@material-ui/core";

const amenityOptions = [
  { label: "Wifi", value: "wifi" },
  { label: "Gym", value: "gym" },
  { label: "Swimming pool", value: "swimming_pool" },
  { label: "Parking", value: "parking" },
  { label: "Pets allowed", value: "pets_allowed" },
];

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

const PropertyFormDetails = () => {
  const classes = useStyles();

  async function refreshAccessToken() {
    const url = "http://localhost:8000/accounts/api/token/refresh/";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ refresh: localStorage.getItem("refresh_token") }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail);
    }
    localStorage.setItem("access_token", data.access);
  }

  useEffect(() => {
    refreshAccessToken().then(() => {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8000/accounts/update/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      };

      fetchData();
    });
  }, []);

  const [preview, setPreview] = useState("");

  const [amenities, setAmenities] = useState([]);

  const handleAmenityChange = (event, value) => {
    if (event.target.checked) {
      setAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  const formattedFromDate = fromDate ? fromDate.format("YYYY-MM-DD") : "";
  const formattedTillDate = tillDate ? tillDate.format("YYYY-MM-DD") : "";

  // it is hard to update ammenities, dates in formData so I took them out
  const [formData, setFormData] = useState({
    location: "",
    num_guests: "",
    num_beds: "",
    num_baths: "",
    descriptions: "",
    images: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("location", formData.location);
    formDataObj.append("num_guests", formData.num_guests);
    formDataObj.append("num_beds", formData.num_beds);
    formDataObj.append("num_baths", formData.num_baths);
    formDataObj.append("descriptions", formData.descriptions);
    formDataObj.append("amenities", amenities);
    formDataObj.append("fromDate", formattedFromDate);
    formDataObj.append("tillDate", formattedTillDate);
    if (formData.images instanceof Array) {
      // If a new file is selected, append it to the form data
      formDataObj.append("images", formData.images);
    }

    // event.preventDefault();
    // const formDataObj = new FormData();
    // formDataObj.append("first_name", formData.first_name);
    // formDataObj.append("last_name", formData.last_name);
    // formDataObj.append("email", formData.email);
    // formDataObj.append("phone", formData.phone);
    // if (formData.profile_picture instanceof File) {
    //   // If a new file is selected, append it to the form data
    //   formDataObj.append("profile_picture", formData.profile_picture);
    // }
    // fetch("http://localhost:8000/accounts/update/", {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //   },
    //   body: formDataObj,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  };

  return (
    <div className={classes.root}>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          maxHeight: "60vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent", // Adjust as needed
          "&::-webkit-scrollbar": {
            width: "3px", // Adjust as needed
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent", // Adjust as needed
            borderRadius: "3px", // Adjust as needed
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust as needed
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent", // Adjust as needed
          },
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          component="form"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
          >
            <Tooltip title="Upload the images of your Hosting">
              <Button
                aria-label="upload property images"
                component="label"
                htmlFor="upload-images-input" // Add htmlFor attribute with the ID of the file input
                disableRipple 
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple
                  id="upload-images-input" // Add ID to the file input
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files && files.length > 0) {
                      const selectedImages = [];
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        selectedImages.push(URL.createObjectURL(file));
                      }
                      setFormData({
                        ...formData,
                        images: selectedImages,
                      });
                      setPreview(selectedImages); // Set the preview to an array of selected images
                    } else {
                      setFormData({ ...formData, images: [] }); // Clear the property_images in formData
                      setPreview(null); // Set preview to null when no images are selected
                    }
                  }}
                />
                <UploadImageWall
                  itemData={preview}
                  hi={300}
                  wd={300}
                  variant="outlined"
                />
              </Button>
            </Tooltip>

            <TextField
              id="location"
              label="Location"
              value={formData.location}
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, location: event.target.value })
              }
            />

            <TextField
              id="num_guests"
              label="Number of guests"
              type="number"
              inputProps={{ min: 0, step: 1 }}
              value={formData.num_guests}
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, num_guests: event.target.value })
              }
            />

            <TextField
              id="num_beds"
              label="Number of beds"
              type="number"
              inputProps={{ min: 0, step: 1 }}
              value={formData.num_beds}
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, num_beds: event.target.value })
              }
            />

            <TextField
              id="num_baths"
              label="Number of Baths"
              type="number"
              inputProps={{ min: 0, step: 1 }}
              value={formData.num_baths}
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, num_baths: event.target.value })
              }
            />

            <Typography variant="subtitle1" color="textSecondary">
              Amenities
            </Typography>

            <div>
              {amenityOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={amenities.includes(option.value)}
                      onChange={(event) =>
                        handleAmenityChange(event, option.value)
                      }
                      name={option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="subtitle1" color="textSecondary">
                Available Dates
              </Typography>
              <DesktopDatePicker
                id="From"
                label="From"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />

              <DesktopDatePicker
                id="Till"
                label="Till"
                value={tillDate}
                onChange={(newValue) => setTillDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              id="price"
              label="Price per night"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              value={formData.price}
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
            />

            <TextField
              id="descriptions"
              label="Descriptions"
              value={formData.descriptions}
              multiline
              rows={4} // Adjust the number of rows as needed
              variant="standard"
              onChange={(event) =>
                setFormData({ ...formData, descriptions: event.target.value })
              }
            />

            <Button
              className={classes.button}
              type="submit"
              sx={{
                ripple: false,
                ml: 1,
                mt: 2,
                color: "black",
                fontSize: "23px",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>

            <Button
              className={classes.button}
              sx={{
                ripple: false,
                ml: 1,
                mt: 2,
                color: "gray",
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default PropertyFormDetails;
