import { Box, Card, CardContent, CardMedia, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { useEffect } from "react";

function Experience () {

  useEffect(() => {
    gsap.fromTo(".experience", { opacity: 0, scale: 0.5}, {duration: .6, opacity: 1, scale: 1, delay: 3.3})
    // gsap.to(".experience", {duration:3, y: "+=10", ease:"power2.inOut" , overwrite:false }).repeat(-1).yoyo(true)
    // gsap.to(".experience", {duration:2.7, x: Math.random(1)*15, ease:"power2.inOut" , overwrite:false }).repeat(-1).yoyo(true)
  } ,[])

  return (
    <Box className="experience">
      <Stack direction="column" spacing={2}>
        <Paper elevation={15} sx={{background:"none"}}>
          <Card sx={{ maxWidth: 600, backgroundColor:"#00000091", color:"#FFFFFF", borderRadius:"15px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image="react.png"
              title="green iguana"
            />
            <CardContent sx={{ p:"10px"}}>
              <Typography variant="h3" align="center">EXPERIENCE</Typography>
              <Typography variant="p" color="white" >
              HTML5, CSS, SASS, ES6, NPM, Yarn, React, Redux, RTK Query, Webpack, Jest, Lint, MUI, GSAP
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Experience;