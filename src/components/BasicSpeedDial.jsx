import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { StyledBasicSpeedDial } from './basicSpeedDial.style'
import { useDispatch, useSelector } from 'react-redux'
import { selectItem, setLocation } from '../redux/reducers/nav.reducer.js'
import { ContactMail, Engineering, PeopleAltOutlined, PersonPin, RocketLaunch, Rocket,  } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'
import { selectNav } from '../redux/selectors/nav.selector';
import { SpeedDialIcon, ThemeProvider, createTheme } from '@mui/material'

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

  const { location:routeLocation } = useSelector(selectNav)
  const shouldHighlight = (page) => {
    if (!routeLocation) {
      return false;
    }
    return routeLocation.pathname.split('/')[1] === page;
  };

  const theme = createTheme({
    components: {
      // Name of the component
      MuiFab: {
        styleOverrides: {
          // Name of the slot
          primary: {
            // Some CSS
            backgroundColor: '#7e00ff !important',
          },
        },
      },
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <StyledBasicSpeedDial>
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon icon={<RocketLaunch />} openIcon={<Rocket/>} />}
          onClose={handleClose}
          onClick={handleClick}
          open={open}
          sx={{ position: 'absolute', bottom: 16, right: 16}}
          
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
              sx={{bgcolor: shouldHighlight(action.name.toLowerCase()) ? action.color : `${action.color}7d`, '&:hover': {bgcolor:action.color}}}
            />
          ))}
        </SpeedDial>
      </StyledBasicSpeedDial>
    </ThemeProvider>
  )
}