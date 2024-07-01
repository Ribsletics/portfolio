import { useGSAP } from "@gsap/react";
import { Box, Card, CardContent, CardMedia, Link, Paper, Stack, Typography } from "@mui/material";
import gsap from "gsap";

function Contact () {

  useGSAP(() => {
    gsap.fromTo(".contact", { opacity: 0, scale: 0.5, y:"+=20"}, {duration: .6, opacity: 1, y:0, scale: 1, delay: 2.5})
  })
  return (
    
    <Box className="contact page" m={2}>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="h1" align="center">CONTACT</Typography>
        </Box>
        <Paper elevation={15} sx={{background:"none"}}>
          <Card sx={{ maxWidth: 800, backgroundColor:"#00000091", color:"#0c9cff", borderRadius:"10px" }} variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image="contact.jpg"
              title="Contact"
            />
            <CardContent sx={{ p:"10px"}}>
              <Typography variant="h3">Email:</Typography>
              <Typography >
                <Link color="white" underline="hover" href="mailto:digitalribs@gmail.com" target="_blank" rel="noopener noreferrer" variant="body1">digitalribs@gmail.com</Link>
              </Typography>
              <Typography variant="h3" mt={2}>LinkedIn:</Typography>
              <Typography >
                <Link color="white" underline="hover" target="_blank" href="https://www.linkedin.com/in/robert-davis-5aa87429/" rel="noopener noreferrer" variant="body1">www.linkedin.com/in/robert-davis-5aa87429/</Link>
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  )
}


export default Contact;