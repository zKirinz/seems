import { lazy, Suspense } from 'react'

import { Switch } from 'react-router-dom'

import LoadingPage from '../pages/Loading'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const publicRoutes = [
    {
        path: '/about',
        name: 'aboutUs',
        component: lazy(() => import('../pages/AboutUs')),
    },
    {
        path: '/',
        name: 'home',
        component: lazy(() => import('../pages/HomePage')),
    },
    {
        path: '/events',
        name: 'event',
        component: lazy(() => import('../pages/Event')),
    },
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('../pages/Login')),
    },
]

const privateRoutes = []

const Routes = (
    <Suspense fallback={<LoadingPage />}>
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
