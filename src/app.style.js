import { Box, styled } from "@mui/material"

export const StyledApp = styled(Box)(
  () => `
  .pixi-container, .main-content {
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    overflow:hidden;
  }
`,
)