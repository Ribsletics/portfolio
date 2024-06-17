import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { StyledSpeedDial } from './basicSpeedDial.style'
import { useDispatch } from 'react-redux'
import { selectItem } from '../redux/reducers/nav.reducer.js'
import { ContactMail, Engineering, PeopleAltOutlined, PersonPin } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const actions = [
  { icon: <Engineering />, name: 'Experience' },
  { icon: <PersonPin />, name: 'About' },
  { icon: <PeopleAltOutlined />, name: 'Interns' },
  { icon: <ContactMail />, name: 'Contact' },
]

export function BasicSpeedDial() {

  const dispatch = useDispatch()
  
  const handleClick = (e) => {
    const action = e.currentTarget.getAttribute('aria-label')
    dispatch(selectItem(action.toLowerCase()))
  }

  return (
      <StyledSpeedDial
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
      </StyledSpeedDial>
  )
}