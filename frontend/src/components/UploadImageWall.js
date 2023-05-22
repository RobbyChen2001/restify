import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Skeleton from "@mui/material/Skeleton";
import { Box, Button } from "@mui/material";

export default function UploadImageWall({ itemData, wd, hi }) {
  const width = wd ? wd : 300;
  const height = hi ? hi : 300;

  // Return skeleton if itemData is null or undefined
  if (!itemData) {
    return (
      <Box
        sx={{
          width: width,
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton variant="rectangular" width={width} height={height} />
      </Box>
    );
  }

  const images = Array.isArray(itemData) ? itemData : [itemData];

  return (
    <Box
      sx={{
        width: "40vw",
        height: height,
        overflowY: "scroll",
        justifyContent: "center",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
          gridAutoColumns: "minmax(250px, 1fr)",
           scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent", // Adjust as needed
          "&::-webkit-scrollbar": {
            width: "3px", // Adjust as needed
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust as needed
            borderRadius: "3px", // Adjust as needed
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 8)", // Adjust as needed
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust as needed
          },
        }}
        cols={1}
        row={1}
        gap={0}
      >
        {images.map((image) => (
          <Button key={image}>
            <ImageListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                aspectRatio: "1 / 1",
                maxHeight: "300px",
              }}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </ImageListItem>
          </Button>
        ))}
      </ImageList>
    </Box>
  );
}
