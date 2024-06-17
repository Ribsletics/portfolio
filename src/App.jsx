import { StyledApp } from './app.style.js'
import { BasicSpeedDial } from './components/BasicSpeedDial'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Stars from './components/Stars.jsx'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Box } from '@mui/material'

let router = createBrowserRouter([
  {
    path: "/",
    Component: () => {
      return (
        <Box className="main-content">
          <Outlet />
          <BasicSpeedDial />
        </Box>
      )
    },
    children: [
      {
        index: true,
        Component: () => {
          return <h1>Home</h1>
        },
      },
      {
        path: "experience",
        Component: () => {
          return <h1>Experience</h1>
        },
      },
      {
        path: "about",
        Component: () => {
          return <h1>About</h1>
        },
      },
      {
        path: "interns",
        Component: () => {
          return <h1>Interns</h1>
        },
      },
      {
        path: "contact",
        Component: () => {
          return <h1>Contact</h1>
        },
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

function App() {
  return (
    <StyledApp>
      <Stars />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </StyledApp>
  )
}


function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Wrapper