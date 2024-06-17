import { styled } from "@mui/material"
import SpeedDial from '@mui/material/SpeedDial'

export const StyledSpeedDial = styled(SpeedDial)(
  () => `
  height: 320px;
  flex-grow: 1;
  bottom: 32px !important;
  right: 32px !important;
`,
)