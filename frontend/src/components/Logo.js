import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Icons
import { BsFillHouseHeartFill } from "react-icons/bs";
import { flexCenter } from "../themes/CommonStyle";
import { pink } from "@mui/material/colors";
import { IconButton } from "@mui/material";

import { Link as RouterLink } from 'react-router-dom';


const Logo = () => {
    return (
            <Box sx={flexCenter}>
                <IconButton component={RouterLink} to="/">
                    <BsFillHouseHeartFill size={40} color={pink[500]} />
                    <Typography
                        sx={{
                        ml: 1,
                        color: (theme) => theme.palette.secondary.main,
                        fontSize: '20px',
                        fontWeight: 'bold',
                        display : {md: 'none', lg: 'block'}
                        }}
                        component="h3"
                        >
                        Restify
                    </Typography>
                </IconButton>
            </Box>
    );
};

export default Logo;