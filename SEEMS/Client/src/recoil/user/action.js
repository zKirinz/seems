import { get, put } from '../../utils/ApiCaller'
import useAuthAction from '../auth/action'

const useUsersAction = () => {
    const { logout } = useAuthAction()
    const getUsers = () =>
        get({
            endpoint: '/api/admin/users',
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const updateUserRole = ({ id, role }) =>
        put({
            endpoint: `/api/admin/users/${id}`,
            body: {
                role,
            },
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const updateUserOrganizationActive = ({ id, Organization, active }) =>
        put({
            endpoint: `/api/admin/users/edit/${id}`,
            body: {
                Organization,
                active,
            },
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getRegisteredUserOfEvent = (eventId) =>
        get({
            endpoint: `/api/reservations/${eventId}`,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const takeUserAttendOfEvent = ({ reservationId, attend }) =>
        put({
            endpoint: `/api/reservations`,
            body: {
                id: reservationId,
                attend,
            },
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    const getUserEventStatistic = (userEmail) =>
        get({ endpoint: `/api/reservations/profile/${userEmail}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

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
