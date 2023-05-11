import * as React from 'react';
import Box from '@mui/material/Box';
import {
    flexBetweenCenter,
    dFlex,
    displayOnDesktop,
  } from '../themes/CommonStyle';
import Container from '@mui/material/Container';

import Logo from './Logo';
import Search from './SearchFilter/Search'
import AccountMenu from './AccountMenu';
import SmallSearch from './SearchFilter/SmallSearch';

import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';


    return (
      <Box
        sx={{
          ...dFlex,
          minHeight: 70,
          borderBottom: '2px solid #ddd',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              ...flexBetweenCenter,
              minHeight: 90,
              px: 4,
            }}
          >
            <Box sx={displayOnDesktop}>
              <Logo />
            </Box>
            {isHomePage && (
            <Box sx={displayOnDesktop}>
              <Search />
            </Box>
            )}
            <Box sx={displayOnDesktop}>
              <AccountMenu />
            </Box>

            {isHomePage && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <SmallSearch />
            </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default NavBar;
  