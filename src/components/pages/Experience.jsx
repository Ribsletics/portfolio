import { useGSAP } from "@gsap/react";
import { Box, Card, CardContent, CardMedia, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";

function Experience() {

  useGSAP(() => {
    gsap.fromTo(".experience", { opacity: 0, scale: 0.5, y: "+=20" }, { duration: .6, opacity: 1, y: 0, scale: 1, delay: 2.5 })
  })

  return (
    <Box className="experience page" m={2}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h1" align="center">EXPERIENCE</Typography>
        </Box>
        <Paper elevation={15} sx={{ background: "none" }}>
          <Card sx={{ maxWidth: 800, backgroundColor: "#00000091", color: "#0c9cff", borderRadius: "10px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image="react.jpg"
              title="React"
            />
            <CardContent sx={{ p: "10px" }}>
              <Typography variant="h3">Web Applications</Typography>
              <Typography variant="body1">
                Developed web application for data analysis and visualization, onboarding, and validation tools. Obtained a lot of profenciency in React, Redux, Material-UI, and more.
              </Typography>
              <Typography variant="h3" mt={2}>Ad Agencies</Typography>
              <Typography variant="body1">
                Banner ads, dynamic emails, tablet presentations, large-scale fully responsive websites! You name it, {"I've"} built it--for both pharmaceutical and consumer brands. Having done so for over a decade, I have been well versed in the world of ad agencies and the creation of digital marketing campaigns.
              </Typography>
              <Typography variant="h3" mt={2}>Small businesses</Typography>
              <Typography variant="body1">
                Providing companies with professional websites that are responsive, user-friendly, and visually appealing. I have experience building web applications using React, Redux, Material-UI, and more.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Experience;