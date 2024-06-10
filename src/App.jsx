import { StyledApp } from './app.style.js'
import { BasicSpeedDial } from './components/BasicSpeedDial'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Stars from './components/Stars.jsx'

function App() {
  return (
    <StyledApp>
      <Stars />
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

export default Wrapper