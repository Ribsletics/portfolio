import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { StyledBasicSpeedDial } from './basicSpeedDial.style';
import { useDispatch } from 'react-redux';
import { selectItem } from '../redux/reducers/nav.reducer.js';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export function BasicSpeedDial() {

  const dispatch = useDispatch();
  
  const handleClick = (e) => {
    const action = e.currentTarget.getAttribute('aria-label');

    switch (action) {
        case 'Copy':
          console.log('Copying...');
          break;
        case 'Save':
          console.log('Saving...');
          break;
        case 'Print':
          console.log('Printing...');
          break;
        case 'Share':
          console.log('Sharing...');
          break;
        default:
          console.log('No action selected');
    }
    dispatch(selectItem);
  };

  return (
    <StyledBasicSpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClick}
          />
        ))}
      </SpeedDial>
    </StyledBasicSpeedDial>
  );
}