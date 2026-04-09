import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { Router } from './Router/Routes'
import BookProvider from './context/BookProvider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
      <RouterProvider router={Router} />
      <ToastContainer />
    </BookProvider>
  </StrictMode>,
)
