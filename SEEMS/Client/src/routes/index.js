import { Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const publicRoutes = []

const privateRoutes = []

export const Routes = () => {
    return (
        <Switch>
            {publicRoutes.map((route) => (
                <PublicRoute key={route.name} exact={true} {...route} />
            ))}
            {privateRoutes.map((route) => (
                <PrivateRoute key={route.name} {...rest} />
            ))}
        </Switch>
    )
}
