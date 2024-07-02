import { useGSAP } from "@gsap/react";
import { Box, Card, CardContent, CardMedia, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";

function Interns() {

  useGSAP(() => {
    gsap.fromTo(".inters", { opacity: 0, scale: 0.5, y: "+=20" }, { duration: .6, opacity: 1, y: 0, scale: 1, delay: 2.5 })
  })

  return (
    <Box className="inters page" m={2}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h1" align="center">INTERNS</Typography>
        </Box>
        <Paper elevation={15} sx={{ background: "none" }}>
          <Card sx={{ maxWidth: 800, backgroundColor: "#00000091", color: "#0c9cff", borderRadius: "10px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image="interns_.jpg"
              title="React"
            />
            <CardContent sx={{ p: "10px" }}>
              <Typography variant="h3" align="center">:: UNDER CONTSTRUCTION ::</Typography>

          
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Interns;