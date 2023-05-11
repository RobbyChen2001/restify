import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { justifyCenter } from '../themes/CommonStyle';
import {
    flexBetweenCenter,
    fullWidthFlex,
  } from '../themes/CommonStyle';

const MobileFooter = () => {
  return (
    <Box sx={{ ...flexBetweenCenter, borderTop: '1px solid #ccc', mt: 3, pt: 2, width: '100%', justifyContent: 'center' }}>
      <Stack sx={{ mt: 2 }}>
        <Paper>
          Copyright 2023 by Restify, Inc.
        </Paper>
      </Stack>
    </Box>
  );
};

export default MobileFooter;