import { get } from '../../utils/ApiCaller'

const useUserAction = () => {
    const getProfile = () => get({ endpoint: '/api/users/me' })

    return {
        getProfile,
    }
}

export default useUserAction
