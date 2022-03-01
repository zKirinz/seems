import { get, put } from '../../utils/ApiCaller'

const useUsersAction = () => {
    const getUsers = () =>
        get({
            endpoint: '/api/admin/users',
        })

    const updateUserRole = ({ id, role }) =>
        put({
            endpoint: `/api/admin/users/${id}`,
            body: {
                role,
            },
        })

    const updateUserOrganizationActive = ({ id, organization, active }) =>
        put({
            endpoint: `/api/admin/users/edit/${id}`,
            body: {
                organization,
                active,
            },
        })

    return {
        getUsers,
        updateUserRole,
        updateUserOrganizationActive,
    }
}

export default useUsersAction
