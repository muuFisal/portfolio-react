import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "experience", element: <Experience /> },
      { path: "events", element: <Events /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);
