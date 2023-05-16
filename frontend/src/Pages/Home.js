import React from 'react';

import Container from '@mui/material/Container';
import { Box, CssBaseline } from '@mui/material';
import { displayOnDesktop } from '../themes/CommonStyle'

import NavBar from '../components/NavBar';
import PropertyCardsDisplay from '../components/PropertyCardsDisplay';
import Footer from '../components/Footer';
import FooterMenu from '../components/FooterMenu';
import MobileFooter from '../components/MobileFooter';

function Home() {
    return (
        <React.Fragment>
        <CssBaseline/>
          <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}>
            <Box>
              <NavBar/>
            </Box>
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height: 100,
              overflowY: 'scroll',
            }}
          >
            <Container maxWidth="xl" sx={{ mb: 3 }}>
              <PropertyCardsDisplay />
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <MobileFooter />
              </Box>
            </Container>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <FooterMenu />
          </Box>
          <Box sx={displayOnDesktop}>
            <Footer />
          </Box>
        </Box>
      </React.Fragment>
    )
}

export default Home;