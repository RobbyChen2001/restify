import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  flexBetweenCenter,
  fullWidthFlex,
} from '../themes/CommonStyle';
const Footer = () => {
  return (
    <Box
      sx={{
        ...fullWidthFlex,
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            ...flexBetweenCenter,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack>
            <Paper>
              Copyright 2023 by Restify, Inc.
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;