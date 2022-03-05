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

    return {
        getUsers,
        updateUserRole,
        updateUserOrganizationActive,
        getRegisteredUserOfEvent,
        takeUserAttendOfEvent,
    }
}

export default useUsersAction
