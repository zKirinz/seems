import { get, put } from '../../utils/ApiCaller'

const useUsersAction = () => {
    const getUsers = () =>
        get({
            endpoint: '/api/admin/users',
        })

    const updateUser = ({ id, role, organization, active }) =>
        put({
            endpoint: `/api/admin/users/${id}`,
            body: {
                role,
                organization,
                active,
            },
        })

    return {
        getUsers,
        updateUser,
    }
}

export default useUsersAction
