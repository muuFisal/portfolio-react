import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import ProjectDetails from "../pages/ProjectDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:slug", element: <ProjectDetails /> },
      { path: "experience", element: <Experience /> },
      { path: "events", element: <Events /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);
