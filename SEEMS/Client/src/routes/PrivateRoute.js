import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import authAtom from '../recoil/auth'

const PrivateRoute = (props) => {
    const match = useRouteMatch()
    const auth = useRecoilValue(authAtom)
    if (!auth.email) {
        return <Redirect to="/" />
    }

    if (match.path === '/admin') {
        if (auth.role !== 'Admin') {
            return <Redirect to="/login" />
        }
    } else {
        if (auth.role === 'Admin') {
            return <Redirect to="/admin" />
        }
    }

    return <Route {...props} />
}

export default PrivateRoute
