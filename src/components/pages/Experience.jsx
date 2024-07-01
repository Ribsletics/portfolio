import { useGSAP } from "@gsap/react";
import { Box, Card, CardContent, CardMedia, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";

function Experience () {

  useGSAP(() => {
    gsap.fromTo(".experience", { opacity: 0, scale: 0.5, y:"+=20"}, {duration: .6, opacity: 1, y:0, scale: 1, delay: 2.5})
  })

  return (
    <Box className="experience page" m={2}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h1" align="center">EXPERIENCE</Typography>
        </Box>
        <Paper elevation={15} sx={{background:"none"}}>
          <Card sx={{ maxWidth: 800, backgroundColor:"#00000091", color:"#0c9cff", borderRadius:"10px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image="react.jpg"
              title="React"
            />
            <CardContent sx={{ p:"10px"}}>
              <Typography variant="h3">Web Applications:</Typography>
              <Typography variant="body1">
                I have experience building web applications using React, Node.js, Express, and MongoDB. I have also worked with Redux, Material-UI, and Bootstrap.
              </Typography>
              <Typography variant="h3" mt={2}>Mobile Applications:</Typography>
              <Typography variant="body1">
                I have experience building mobile applications using React Native, Expo, and Firebase.
              </Typography>
              <Typography variant="h3" mt={2}>Other:</Typography>
              <Typography variant="body1">
                I have experience with Git, GitHub, and Visual Studio Code.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Experience;