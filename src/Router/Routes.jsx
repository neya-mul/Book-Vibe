import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage";
import Books from "../Pages/Books";
import NotFound404 from "../Pages/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Homepage></Homepage>
            },
            {
                path: "books",
                element: <Books></Books>
            }
        ],
        errorElement: <NotFound404></NotFound404>
  },
    {
        path: "/books",
        element: "Books"
    }
])
