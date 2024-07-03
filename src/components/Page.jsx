import { Box } from '@mui/material';
import './page.css';

function Page ({ page, children }) {

  return (
      <Box className={`page-container ${page}`}>
        {children}
      </Box>
  )
}

export default Page;