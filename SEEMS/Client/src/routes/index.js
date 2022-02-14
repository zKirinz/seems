import React, { lazy, Suspense } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { AdminLayout, CommonLayout } from '../components/Layout'

import LoadingPage from '../pages/Loading'
import HybridRoute from './HybridRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('../pages/Login')),
    },
]

const hybridRoutes = [
    {
        path: '/event/create',
        name: 'eventCreation',
        component: lazy(() => import('../pages/EventRegistration')),
        layout: 'common',
    },
    {
        path: '/',
        name: 'home',
        privateComponent: lazy(() => import('../pages/Home/privateHome')),
        publicComponent: lazy(() => import('../pages/Home/publicHome')),
        layout: 'common',
    },
    {
        path: '/about',
        name: 'about',
        privateComponent: lazy(() => import('../pages/About')),
        publicComponent: lazy(() => import('../pages/About')),
        layout: 'common',
    },
]

const privateRoutes = [
    {
        path: '/admin',
        name: 'admin home',
        component: lazy(() => import('../pages/Admin/Home')),
        layout: 'admin',
    },
]

const Routes = (
    <Suspense fallback={<LoadingPage />}>
        <Switch>
            {publicRoutes.map(
                ({ layout, ...route }) =>
                    !layout && <PublicRoute key={route.name} exact={true} {...route} />
            )}
            {privateRoutes.map(
                ({ layout, ...route }) =>
                    !layout && <PrivateRoute key={route.name} exact={true} {...route} />
            )}
            {hybridRoutes.map(
                ({ layout, ...route }) =>
                    !layout && <HybridRoute key={route.name} exact={true} {...route} />
            )}
            <Route path="/admin">
                <AdminLayout>
                    <Suspense fallback={<LoadingPage />}>
                        <Switch>
                            {publicRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && (
                                        <PublicRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            {privateRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && (
                                        <PrivateRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            {hybridRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'admin' && (
                                        <HybridRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            <Redirect to="/admin" />
                        </Switch>
                    </Suspense>
                </AdminLayout>
            </Route>
            <Route>
                <CommonLayout>
                    <Suspense fallback={<LoadingPage />}>
                        <Switch>
                            {publicRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && (
                                        <PublicRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            {privateRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && (
                                        <PrivateRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            {hybridRoutes.map(
                                ({ layout, ...route }) =>
                                    layout === 'common' && (
                                        <HybridRoute key={route.name} exact={true} {...route} />
                                    )
                            )}
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </CommonLayout>
            </Route>
        </Switch>
    </Suspense>
)

export default Routes
