import { Redirect, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import authAtom from '../recoil/auth'

const PrivateRoute = (props) => {
    const { role, ...rest } = props
    const auth = useRecoilValue(authAtom)
    if (!auth.email) {
        return <Redirect to="/" />
    }

    if (role.includes('admin')) {
        if (auth.role !== 'Admin') {
            return <Redirect to="/" />
        }
    } else if (role.includes('organizer')) {
        if (role.includes('user')) {
            if (auth.role === 'Admin') {
                return <Redirect to="/admin" />
            }
        } else {
            if (auth.role === 'Admin') {
                return <Redirect to="/admin" />
            } else if (auth.role === 'User') {
                return <Redirect to="/" />
            }
        }
    }

    return <Route {...rest} />
}

export default PrivateRoute
