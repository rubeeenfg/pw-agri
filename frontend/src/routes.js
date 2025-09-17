import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Productos = React.lazy(() => import('./views/productos/vistaProductos'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/productos', name: 'Productos', element: Productos },



]

export default routes
