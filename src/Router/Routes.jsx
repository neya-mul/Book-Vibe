import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage";
import Books from "../Pages/Books";
import NotFound404 from "../Pages/Error";
import BookDetails from "../Pages/BookDetails";
// import BookDetails from "../ Components/BookDetails";

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
            },
            {
                path: "/bookDetails/:id",
                element: <BookDetails></BookDetails>
            }
        ],
        errorElement: <NotFound404></NotFound404>
    },

])
