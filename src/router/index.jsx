import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Detail, Issue } from "../pages";

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
        }
      ]
    },
  ]);

export default router;