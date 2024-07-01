import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: { fontSize: '2rem',
          fontWeight: 500,
          fontFamily: 'Orbitron'},
    h3: { fontSize: '1.5rem',
          fontWeight: 500,
          fontFamily: 'Orbitron'},
    body1: { fontFamily: 'arial', fontSize: '1rem', color:"white" }
  },
  components: {
    MuiTypography : {
      styleOverrides: {
        root: { textShadow: '2px 2px 3px #000000'}}},
    MuiTimelineContent : {
      styleOverrides: {
        root: { textShadow: '2px 2px 3px #000000',
                fontFamily: 'Orbitron',
                fontSize: '.8rem'}}},
    MuiTimelineItem: {
      styleOverrides: {
        root: { minHeight: '60px',}}}
  }
});

export default theme;