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
import Page from './components/Page.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <>
        <Outlet />
        <BasicSpeedDial />
      </>,
    children: [
      {
        index: true,
        element: <Page name="home" className="home" />
      },
      {
        path: "experience",
        element: <Page name="experience" className="experience" />  
      },
      {
        path: "about",
        element: <Page name="about" className="about" />  
      },
      {
        path: "interns",
        element: <Page name="interns" className="interns" />  
      },
      {
        path: "contact",
        element: <Page name="contact" className="contact" />  
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

function CurrentRoute() {
  const location = useLocation();
  //console.log("loc: ", location)
  return <div>Current Route: {location.pathname}</div>;
}

function App() {
  return (
    <StyledApp>
      <Stars />
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