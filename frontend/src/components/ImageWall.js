import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Button, IconButton } from "@mui/material";

export default function ImageWall({ itemData }) {

 //return null if itemData is null
  if (!itemData) return null;

  const images = Array.isArray(itemData.images)
    ? itemData.images
    : [itemData.images];

  //check the length of the array
  console.log("images.length:", images.length);

  // set the number of columns and row height based on the number of images
  const cols = images.length < 5 ? 2 : 1;
  const rows = images.length < 5 ? 2 : 1;


  return (
    <Box
      sx={{
        width: 800,
        height: 600,
        overflowY: "scroll", 
        justifyContent: "center",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ImageList variant="masonry" cols={cols} row={rows} gap={2}>
        {images.map((image) => (
          <Button>
            <ImageListItem key={image}>
              <img
                src={`${image}?w=161&fit=crop&auto=format`}
                srcSet={`${image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={itemData.location}
                loading="lazy"
                style={{ minWidth: "300px", minHeight: "300px", objectFit: 'contain'  }}
              />
            </ImageListItem>
          </Button>
        ))}
      </ImageList>
    </Box>
  );
}