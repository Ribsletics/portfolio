import { Box } from '@mui/material';
import './page.css';

function Page ({ name, children }) {

  return (
      <Box className={`page-container ${name}`}>
        {children}
      </Box>
  )
}

export default Page;