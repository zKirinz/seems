import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { post } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import authAtom from './atom'

const useAuthAction = () => {
    const history = useHistory()
    const setAuth = useSetRecoilState(authAtom)

    const autoLogin = () => {
        const token = LocalStorageUtils.getToken()
        const user = LocalStorageUtils.getUser()

        if (user && typeof user === 'object') {
            if (user?.exp && user?.exp * 1000 > Date.now()) {
                setAuth({ token, email: user.email, role: user.role, exp: user.exp })
            } else {
                logout()
            }
        } else {
            setAuth({ token: null, email: '', role: '', exp: 0 })
        }
    }

    const login = (token) =>
        post({
            endpoint: '/api/authentication/auth',
            headers: { token },
        }).then((response) => {
            if (response?.data?.status === 'success') {
                LocalStorageUtils.setUser(token)
                const { email, role, exp } = jwt_decode(token)
                setAuth({ token, email, role, exp })
                if (role === 'Admin') {
                    history.push('/admin')
                } else history.push('/')
            } else {
                throw new Error('Something went wrong')
            }
        })

    const logout = () => {
        LocalStorageUtils.deleteUser()
        setAuth({ token: null, email: '', role: '', exp: 0 })
    }

    return {
        autoLogin,
        login,
        logout,
    }
}

export default useAuthAction
