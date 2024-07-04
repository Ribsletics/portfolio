import { Box, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { useEffect, useRef } from "react";

function Home() {

  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, scale: 0.5, y:"+=20"}, {duration: .6, opacity: 1, y:0, scale: 1, delay: 2.5})
  });

  return (
    <Box className="home" p={4} ref={ref}>
      <Stack direction="column" spacing={2}>
      <Typography variant="h1" align="center">Robert Davis</Typography>
      <Typography variant="body1" align="center">Welcome to my portfolio! Im currently building awesome new features. Check back for updates!</Typography>
      <Typography variant="body1" align="center">Feel free to do some interplanetary travel in the meantime.</Typography>
      <Typography variant="h3" align="center">Buckle up!</Typography>
      </Stack>
    </Box>
  )
}

export default Home;