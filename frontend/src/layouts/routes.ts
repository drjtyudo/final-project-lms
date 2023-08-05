import publicRoutes from 'layouts/routes/public'
import adminRoutes from 'layouts/routes/admin'

const globalRoutes = [...publicRoutes, ...adminRoutes]

export default globalRoutes
