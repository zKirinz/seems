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

    const updateUserOrganizationActive = ({ id, Organization, active }) =>
        put({
            endpoint: `/api/admin/users/edit/${id}`,
            body: {
                Organization,
                active,
            },
        })

    const getRegisteredUserOfEvent = (eventId) =>
        get({
            endpoint: `/api/reservations/${eventId}`,
        })

    const takeUserAttendOfEvent = ({ reservationId, attend }) =>
        put({
            endpoint: `/api/reservations`,
            body: {
                id: reservationId,
                attend,
            },
        })
    const getUserEventStatistic = (userEmail) =>
        get({ endpoint: `/api/reservations/profile/${userEmail}` })

    return {
        getUsers,
        updateUserRole,
        updateUserOrganizationActive,
        getRegisteredUserOfEvent,
        takeUserAttendOfEvent,
        getUserEventStatistic,
    }
}

export default useUsersAction
