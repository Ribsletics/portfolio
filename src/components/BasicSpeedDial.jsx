import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { StyledBasicSpeedDial } from './basicSpeedDial.style'
import { useDispatch } from 'react-redux'
import { selectItem, setLocation } from '../redux/reducers/nav.reducer.js'
import { ContactMail, Engineering, PeopleAltOutlined, PersonPin } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const actions = [
  { icon: <Engineering />, name: 'Experience' },
  { icon: <PersonPin />, name: 'About' },
  { icon: <PeopleAltOutlined />, name: 'Interns' },
  { icon: <ContactMail />, name: 'Contact' },
]

export function BasicSpeedDial() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLocation(location))
  }, [dispatch, location])

  const handleClick = (e) => {
    const action = e.currentTarget.getAttribute('aria-label')
    //const index = e.currentTarget.getAttribute('data-index')
    dispatch(selectItem(action.toLowerCase()))
  }

  return (
    <StyledBasicSpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
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
          />
        ))}
      </SpeedDial>
    </StyledBasicSpeedDial>
  )
}