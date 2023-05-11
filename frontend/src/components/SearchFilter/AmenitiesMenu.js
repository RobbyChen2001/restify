import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';



import { pink } from "@mui/material/colors";
import { VscSettings } from "react-icons/vsc";


const amenities = ["Wifi", "Gym", "Swimming pool", "Parking", "Pets allowed"];

export default function AmenitiesMenu(){
    return (
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <div>
            <Button {...bindToggle(popupState)}>
              <VscSettings color={pink[300]} size={24} />
            </Button>
            <Popper {...bindPopper(popupState)} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <CheckboxList />
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
    );
  }

const CheckboxList = () => {
    const [checked, setChecked] = React.useState([0]);
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {amenities.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
  
          return (
            <ListItem
              key={value}
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    )
    }