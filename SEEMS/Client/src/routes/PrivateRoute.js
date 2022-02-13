import { Redirect, Route, useRouteMatch } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

const PrivateRoute = (props) => {
    const match = useRouteMatch()
    const user = LocalStorageUtils.getUser()

    if (!user?.email) {
        return <Redirect to="/login" />
    }

    if (match.path === '/admin') {
        if (user.role !== 'Admin') {
            return <Redirect to="/login" />
        }
    } else {
        if (user.role === 'Admin') {
            return <Redirect to="/admin" />
        }
    }

    return <Route {...props} />
}

export default PrivateRoute
