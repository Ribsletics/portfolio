import { Box, styled } from "@mui/material"

export const StyledBasicSpeedDial = styled(Box)(
  ({ theme }) => `
  height: 320px;
  flex-grow: 1;
  position: absolute;
  bottom: 3px;
  right: 3px;

  .MuiButtonBase-root {
    transition: none !important;
`,
)