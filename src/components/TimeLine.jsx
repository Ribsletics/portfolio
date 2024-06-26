import { Box, Stack } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useSelector } from 'react-redux';
import { selectNav } from '../redux/selectors/nav.selector';

export default function TimeLine() {
  const { location:routeLocation } = useSelector(selectNav)
  const blue = "#0384fcab";
  const yellow = "#fce303ab";
  const orange = "#ff7700ab";
  const green = "#15ff00ab";
  const boxShadowStyle = '0px 0px 11px 8px';

  const shouldApplyBoxShadow = (page) => {
    if (!routeLocation) {
      return false;
    }
    return routeLocation.pathname.split('/')[1] === page;
  };


  return (
    <Box className="timeline"
      sx={{position:"absolute",
           bottom:0,
           left:0}}>
      <Stack direction="column" spacing={2}>
          <Timeline position="alternate" sx={{minWidth:"240px", padding:"0"}}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{bgcolor:"#fce303", boxShadow: shouldApplyBoxShadow('contact') ? `${boxShadowStyle} ${yellow}` : 'none' }} />
                <TimelineConnector sx={{bgcolor:'#7e00ff'}} />
              </TimelineSeparator>
              <TimelineContent>Contact</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{bgcolor:"#0384fc", boxShadow: shouldApplyBoxShadow('interns') ?  `${boxShadowStyle} ${blue}` : 'none' }} />
                <TimelineConnector sx={{bgcolor:'#7e00ff'}} />
              </TimelineSeparator>
              <TimelineContent>Interns</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{bgcolor:"#ff7700", boxShadow: shouldApplyBoxShadow('about') ?  `${boxShadowStyle} ${orange}` : 'none' }} />
                <TimelineConnector sx={{bgcolor:'#7e00ff'}} />
              </TimelineSeparator>
              <TimelineContent>About</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{bgcolor:"#15ff00", boxShadow: shouldApplyBoxShadow('experience') ?  `${boxShadowStyle} ${green}` : 'none' }}/>
              </TimelineSeparator>
              <TimelineContent>Experience</TimelineContent>
            </TimelineItem>
          </Timeline>
      </Stack>
    </Box>
  )
}
