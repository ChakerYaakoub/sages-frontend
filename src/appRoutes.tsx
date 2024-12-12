import AnonymiserPdf from "./pages/AnonymiserPdf/AnonymiserPdf";
import Home from "./pages/Home/Home";
import NotFound404 from "./pages/NotFound404/NotFound404";

const appRoutes = [
  { path: "/", element: <Home /> },

  { path: "*", element: <NotFound404 /> },
  { path: "/anonymiser-pdf", element: <AnonymiserPdf /> },
];

export default appRoutes;
