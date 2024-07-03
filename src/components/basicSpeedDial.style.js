import { Box, styled } from "@mui/material"

export const StyledBasicSpeedDial = styled(Box)(
  ({ theme }) => `
  height: 320px;
  flex-grow: 1;
  position: absolute;
  top: 6px;
  right: 6px;

  .MuiButtonBase-root {
    transition: none !important;
`,
)