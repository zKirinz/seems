import { lazy, Suspense } from 'react'

import { Switch } from 'react-router-dom'

import { CircularProgress } from '@mui/material'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('../pages/Login')),
    },
]

const privateRoutes = []

const Routes = (
    <Suspense fallback={<CircularProgress />}>
        <Switch>
            {publicRoutes.map((route) => (
                <PublicRoute key={route.name} exact={true} {...route} />
            ))}
            {privateRoutes.map((route) => (
                <PrivateRoute key={route.name} {...route} />
            ))}
        </Switch>
    </Suspense>
)

export default Routes
