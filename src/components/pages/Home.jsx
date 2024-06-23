import { Box, Stack, Typography } from "@mui/material";

function Home() {

  return (
    <Box className="home">
      <Stack direction="column" spacing={2}>
        <Typography variant="h3" align="center">home</Typography>
      </Stack>
    </Box>
  )
}

export default Home;