import { Box, Stack, Typography } from "@mui/material";

function Home() {

  return (
    <Box className="home" p={4}>
      <Stack direction="column" spacing={2}>
      <Typography variant="h1" align="center">Robert Davis</Typography>
      <Typography variant="p" align="center">Welcome to my portfolio! Im currently building awesome new features. Check back for updates!</Typography>
      <Typography variant="p" align="center">Feel free to do some interplanetary travel in the mean time.</Typography>
      <Typography variant="h3" align="center">Buckle up!</Typography>
      </Stack>
    </Box>
  )
}

export default Home;