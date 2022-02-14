import jwt_decode from 'jwt-decode'
import { useSetRecoilState } from 'recoil'

import { post } from '../../utils/ApiCaller'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
import authAtom from './atom'

const useAuthAction = () => {
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
                setAuth(authAtom, { token, email, role, exp })
                if (role === 'Admin') {
                    window.location.reload(false)
                } else window.location.reload(false)
            } else {
                throw new Error('Something went wrong')
            }
        })

    const logout = () => {
        LocalStorageUtils.deleteUser()
        window.location.reload(false)
        setAuth({ token: null, email: '', role: '', exp: 0 })
    }

    return {
        autoLogin,
        login,
        logout,
    }
}

export default useAuthAction
