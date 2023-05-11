import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { FaSearch } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import { Button } from '@mui/material';

import DropDownSearch from './DropDownSearch';
import AmenitiesMenu from "./AmenitiesMenu";


const SmallSearch = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        border: '1px solid #ccc',
        borderRadius: 20,
      }}
    >
      
      
      <IconButton type="submit" sx={{ p: '10px' }}>
        <FaSearch />
      </IconButton>

      <DropDownSearch />
      
      
          

      <AmenitiesMenu id="amenities"/>

    </Paper>
  );
};

export default SmallSearch;