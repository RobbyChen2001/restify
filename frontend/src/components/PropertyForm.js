import React from 'react';

import Container from '@mui/material/Container';
import { Box, CssBaseline } from '@mui/material';
import { displayOnDesktop } from '../themes/CommonStyle'


import AccountProfile from '../components/AccountProfile';


function PropertyForm() {
    return (
        <React.Fragment>
        <CssBaseline/>
          <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Container maxWidth="xl" sx={{ mb: 3 }}>
            
            <AccountProfile />

            </Container>
        </Box>
      </React.Fragment>
    )
}

export default PropertyForm;