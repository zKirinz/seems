import { Route, Redirect } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import authAtom from '../recoil/auth'

const PublicRoute = (props) => {
    const auth = useRecoilValue(authAtom)

    if (!auth.email) {
        return <Route {...props} />
    }

    return <Redirect to="/" />
}

export default PublicRoute
