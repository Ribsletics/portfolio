import { StyledApp } from './app.style.js'
import { BasicSpeedDial } from './components/BasicSpeedDial'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Stars from './components/Stars.jsx'
import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Page from './components/Page.jsx'
import Home from './components/pages/Home.jsx'
import Experience from './components/pages/Experience.jsx'
import About from './components/pages/About.jsx'
import Interns from './components/pages/Interns.jsx'
import Contact from './components/pages/Contact.jsx'
import TimeLine from './components/TimeLine.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/index.js'

//using Hash Router for github pages
let router = createHashRouter([
  {
    path: "/",
    element: <ThemeProvider theme={theme}>
                <Outlet />
                <BasicSpeedDial />
                <TimeLine />
             </ThemeProvider>,
    children: [
      {
        index: true,
        element:<Page>
                  <Home />
                </Page>
      },
      {
        path: "experience",
        element:<Page>
                  <Experience />
                </Page> 
      },
      {
        path: "about",
        element:<Page>
                  <About />
                </Page>
      },
      {
        path: "interns",
        element:<Page>
                  <Interns />
                </Page>
      },
      {
        path: "contact",
        element:<Page>
                  <Contact />
                </Page>
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

function CurrentRoute() {
  const location = useLocation();
  return <div>Current Route: {location.pathname}</div>;
}

function App() {
  
  return (
    <StyledApp>
      <Stars style={{position: "absolute", top:0}} />
    </StyledApp>
  )
}

function Wrapper() {
  return (
    <Provider store={store}>
      <App />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} >
        <CurrentRoute />
      </RouterProvider>
    </Provider>
  )
}

export default Wrapper