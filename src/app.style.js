import { Box, styled } from "@mui/material"

export const StyledApp = styled(Box)(
  ({ theme }) => `
  .pixi-container {
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    overflow:hidden;
  }
`,
)