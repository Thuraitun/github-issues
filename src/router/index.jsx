import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Detail, Issue, NoFound } from "../pages";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Issue />
        },
        {
          path: "/issue/:id",
          element: <Detail />
        },
        {
          path: "*",
          element: <NoFound />
        }
      ]
    },
  ]);

export default router;