import React, { lazy, Suspense } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { AdminLayout, CommonLayout } from '../components/Layout'

import EventPage from '../pages/Events'
import { publicHome, privateHome } from '../pages/Home'
import LoadingPage from '../pages/Loading'
import LoginPage from '../pages/Login'
import HybridRoute from './HybridRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
]

const hybridRoutes = [
    {
        path: '/',
        name: 'home',
        privateComponent: privateHome,
        publicComponent: publicHome,
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
        path: '/events',
        name: 'events',
        component: EventPage,
        layout: 'common',
        role: ['user', 'organizer'],
    },
    {
        path: '/events/me',
        name: 'my events',
        component: lazy(() => import('../pages/MyEvents')),
        layout: 'common',
        role: ['organizer'],
    },
    {
        path: '/events/me/:id/attendance',
        name: 'my events',
        component: lazy(() => import('../pages/CheckAttendance')),
        layout: 'common',
        role: ['organizer'],
    },
    {
        path: '/events/my-registrations',
        name: 'my registrations',
        component: lazy(() => import('../pages/MyRegistrations')),
        layout: 'common',
        role: ['user', 'organizer'],
    },
    {
        path: '/events/create',
        name: 'create event',
        component: lazy(() => import('../pages/CreateEvent')),
        layout: 'common',
        role: ['organizer'],
    },
    {
        path: '/events/:id/update',
        name: 'update event',
        component: lazy(() => import('../pages/UpdateEvent')),
        layout: 'common',
        role: ['organizer'],
    },
    {
        path: '/events/:id',
        name: 'event detailed',
        component: lazy(() => import('../pages/EventDetailed')),
        layout: 'common',
        role: ['user', 'organizer'],
    },
    {
        path: '/admin',
        name: 'admin home',
        component: lazy(() => import('../pages/Admin/Home')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events',
        name: 'admin events',
        component: lazy(() => import('../pages/Admin/Events')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events/me',
        name: 'admin my events',
        component: lazy(() => import('../pages/Admin/MyEvents')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/users',
        name: 'admin users',
        component: lazy(() => import('../pages/Admin/Users')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events/create',
        name: 'admin create event',
        component: lazy(() => import('../pages/Admin/CreateEvent')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events/:id/update',
        name: 'admin create event',
        component: lazy(() => import('../pages/Admin/UpdateEvent')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events/me/:id/attendance',
        name: 'admin check attendance',
        component: lazy(() => import('../pages/Admin/CheckAttendance')),
        layout: 'admin',
        role: ['admin'],
    },
    {
        path: '/admin/events/:id',
        name: 'admin event detailed',
        component: lazy(() => import('../pages/Admin/EventDetailed')),
        layout: 'admin',
        role: ['admin'],
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
