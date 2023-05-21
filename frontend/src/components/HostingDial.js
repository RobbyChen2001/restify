import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CommentIcon from '@mui/icons-material/Comment';import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import PropertyForm from "../components/PropertyForm";


export default function HostingDial() {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openmodal, setOpenmodal] = React.useState(false);
  const handleModalClose = () => setOpenmodal(false);

  const handleAdd = () => {
    setOpenmodal(true);
    handleClose();
  };

  const actions = [
    { icon: <FileCopyIcon />, name: 'Add', click: handleAdd },
    { icon: <CommentIcon />, name: 'Comments' },
    { icon: <DashboardIcon />, name: 'DashBoard' },
  ];
  

  return (
    <Box sx={{ height: '80vh', transform: 'translateZ(0px)', flexGrow: 1, position: 'relative' }}>

      {/* <Backdrop open={open} /> */}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16, }}
        icon={<SpeedDialIcon sx={{color: (theme) => theme.palette.main}}/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.click}
          />
        ))}
      </SpeedDial>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openmodal}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openmodal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <PropertyForm />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
