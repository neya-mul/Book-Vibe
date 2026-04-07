import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { router } from './Router/Routes'
import BookProvider from './context/BookProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
      <RouterProvider router={router} />
    </BookProvider>

  </StrictMode>,
)
