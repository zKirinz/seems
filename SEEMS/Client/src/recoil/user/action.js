import { get } from '../../utils/ApiCaller'

const useUsersAction = () => {
    const getUsers = () =>
        get({
            endpoint: '/api/admin/users?PageNumber=1&PageSize=10',
        })

    return {
        getUsers,
    }
}

export default useUsersAction
