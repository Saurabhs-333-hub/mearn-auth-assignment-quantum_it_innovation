import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useRoutes, Outlet, Navigate } from "react-router-dom";
import FormPage from "./Form";
import Home from "./Home";

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/', element: <FormPage /> },
        {
          path: '/home',
          element: localStorage.getItem('user') ? <Home /> : <Navigate to="/" />,
        },
        { path: '*', element: <FormPage /> },
      ],
    },
  ]);

  return routes;
}

export default App;
