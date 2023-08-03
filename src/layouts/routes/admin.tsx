import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('layouts/containers/Admin'))

const routes = [
  {
    path: '/admin',
    layout: AdminContainer,
    exact: true,
  },
]

export default routes
