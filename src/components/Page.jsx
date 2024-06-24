import { Box } from '@mui/material';
import './page.css';

function Page ({ children }) {

  return (
      <Box className={'page-container'}>
        {children}
      </Box>
  )
}

export default Page;