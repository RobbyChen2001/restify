import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaSearch, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';

import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { Link as RouterLink } from 'react-router-dom';


const footerMenu = [
  { id: 1, text: 'Explore', icon: <FaSearch size={18} /> , link: '/'},
  { id: 2, text: 'Reservations', icon: <BookmarkIcon size={18} /> , link: '/reservations' },
  { id: 3, text: 'Hosting', icon: <AddBusinessIcon size={18} /> , link: '/propertyhost'},
  { id: 4, text: 'Notifications', icon: <NotificationsIcon size={18} /> , link: '/notification' },
  { id: 4, text: 'Profile', icon: <FaRegUserCircle size={18} /> , link: '/profile'},
];

const FooterMenu = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
      <Stack>
        {footerMenu.map((item) => {
          return (
            <Button key={item.id} component={RouterLink} to={item.link}>
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                direction="column"
                spacing={1}
              >
                {item.icon}
                <Typography> {item.text}</Typography>
              </Stack>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FooterMenu;