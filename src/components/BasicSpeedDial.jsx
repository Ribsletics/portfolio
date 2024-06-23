import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { StyledBasicSpeedDial } from './basicSpeedDial.style'
import { useDispatch } from 'react-redux'
import { selectItem, setLocation } from '../redux/reducers/nav.reducer.js'
import { ContactMail, Engineering, PeopleAltOutlined, PersonPin } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'

const actions = [
  { icon: <Engineering />, name: 'Experience', color: '#15ff00'},
  { icon: <PersonPin />, name: 'About', color: '#ff7700'},
  { icon: <PeopleAltOutlined />, name: 'Interns', color: '#0384fc' },
  { icon: <ContactMail />, name: 'Contact', color: '#fce303'},
]

export function BasicSpeedDial() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(setLocation(location))
  }, [dispatch, location])
  
  const handleClick = (e) => {
    setOpen(!open);
    const action = e.currentTarget.getAttribute('aria-label')
    
    if (action) dispatch(selectItem(action.toLowerCase()))
    //dispatch(selectItem(action.toLowerCase()))
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledBasicSpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon sx={{bgcolor: '#7e00ff29'}} />}
        onClose={handleClose}
        onClick={handleClick}
        open={open}
      >
        {actions.map((action, i) => (
          <SpeedDialAction
            component={Link}
            to={action.name.toLowerCase()}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClick}
            data-index={i}
            sx={{bgcolor: `${action.color}ab`, '&:hover': {bgcolor:action.color}}}
          />
        ))}
      </SpeedDial>
    </StyledBasicSpeedDial>
  )
}