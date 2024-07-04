import { useGSAP } from "@gsap/react";
import { Box, Card, CardContent, CardMedia, Link, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";

function About () {

  useGSAP(() => {
    gsap.fromTo(".about", { opacity: 0, scale: 0.5, y:"+=20"}, {duration: .6, opacity: 1, y:0, scale: 1, delay: 2.5})
  })
  return (
    
    <Box className="about page" m={2}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h1" align="center">ABOUT</Typography>
        </Box>
        <Paper elevation={15} sx={{background:"none"}}>
          <Card sx={{ maxWidth: 800, backgroundColor:"#00000091", color:"#0c9cff", borderRadius:"10px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140,
                filter: "brightness(130%)"
               }}
              image="about.jpg"
              title="About"
            />
            <CardContent sx={{ p:"10px"}}>
              <Typography variant="h3">Programming:</Typography>
              <Typography variant="body1">
                I love building modular, reusable tools. From static web pages to full-stack applications, I enjoy the process of creating software that is both functional and visually appealing, and polishing it until it shines.
              </Typography>
              <Typography variant="h3" mt={2}>Music Composition:</Typography>
              <Typography variant="body1">
                I have composed music for video games, short animations, and personal fun. I was foruntate enough to write music featured in these <Link color="#ffffff" underline="always" target="_blank" href="http://manningkrull.com/halloween-animations/" rel="noopener noreferrer" variant="body1">amazing animations</Link>, by Manning Krull.
              </Typography>
              <Typography variant="h3" mt={2}>Drums:</Typography>
              <Typography variant="body1">
                I have been playing drums for over 25 years. I have played in bands, recorded in studios, and performed live. I have experience with a variety of styles, including rock, metal, funk, and jazz. Favorite band is Tool. Vinyl {'>'} digital.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}


export default About;