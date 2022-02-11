import { Redirect, Route } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

const PrivateRoute = (props) => {
    const user = LocalStorageUtils.getUser()
    if (user?.email) {
        return <Route {...props} />
    }

    return <Redirect to="/login" />
}

export default PrivateRoute
