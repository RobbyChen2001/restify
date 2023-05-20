import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// react icons
import { BsGlobe } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { flexCenter } from "../themes/CommonStyle";

import Avatar from "@mui/material/Avatar";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    profile_picture: null,
  });

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
    console.log("data", data);
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

  return (
    <Box sx={flexCenter}>
      <Stack>
        <Button
          sx={{
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ justifyContent: "space-between" }}
          >
            <AiOutlineMenu size={30} />
            {formData ? (
              <Avatar
                alt={formData.first_name}
                src={`http://localhost:8000${formData.profile_picture}`}
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <FaRegUserCircle size={30} />
            )}
          </Stack>
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileSettings;
