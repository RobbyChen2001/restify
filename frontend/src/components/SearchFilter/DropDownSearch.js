import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

import ColumnSearch from './ColumnSearch';

export default function DropDownSearch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
         <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Where to?" disabled />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
      >
        <ColumnSearch/>
      </Popover>
    </div>
  );
}
