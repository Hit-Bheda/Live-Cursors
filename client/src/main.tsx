import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },{
    path: '/cursors',
    element: <Home />
  },{
    path: '*',
    element: <Login />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
