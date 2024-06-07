import { Box } from '@mui/material';
import { useStarwarp } from './hooks/Starwarp.hook.js';
import { useRef } from 'react';
import { StyledApp } from './app.style.js';
import { BasicSpeedDial } from './components/BasicSpeedDial';
import { Provider } from 'react-redux';
import store from './redux/store.js';

function App() {
  const canvasRef = useRef();
  const containerRef = useRef();
  useStarwarp(canvasRef, containerRef);

  return (
    <StyledApp>
      <Box ref={containerRef} className="pixi-container">
        <canvas ref={canvasRef} />
      </Box>
      <BasicSpeedDial/>
    </StyledApp>
  )
}

function Wrapper() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

export default Wrapper;