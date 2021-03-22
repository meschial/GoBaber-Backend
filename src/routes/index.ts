  
import { Router } from 'express'
import appointmentsRouter from './appointmentsRouter'
import usersRoutes from './usersRoutes'
import sessionRouter from './sessionRouter'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRouter)

export default routes