import { StyledApp } from './app.style.js'
import { BasicSpeedDial } from './components/BasicSpeedDial'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Stars from './components/Stars.jsx'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";

let router = createBrowserRouter([
  {
    path: "/",
    Component: () => {
      return <BasicSpeedDial />
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

function CurrentRoute() {
  const location = useLocation();
  console.log("loc: ", location)
  return <div>Current Route: {location.pathname}</div>;
}

function App() {
  return (
    <StyledApp>
      <Stars />
      <Outlet />
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