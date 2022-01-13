import { Redirect, Route } from 'react-router-dom'

import LocalStorageUtils from 'src/utils/LocalStorageUtils'

const PrivateRoute = (props) => {
    const user = LocalStorageUtils.getUser()
    if (!user?.email) return <Redirect to="/login" />

    return <Route {...props} />
}

export default PrivateRoute
