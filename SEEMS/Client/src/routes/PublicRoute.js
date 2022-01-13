import { Route, Redirect } from 'react-router-dom'

import LocalStorageUtils from 'src/utils/LocalStorageUtils'

const PublicRoute = (props) => {
    const user = LocalStorageUtils.getUser()
    if (!user?.email) {
        return <Route {...props} />
    }

    return <Redirect to="/" />
}

export default PublicRoute
