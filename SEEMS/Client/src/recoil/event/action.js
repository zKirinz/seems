import { get, post, put, remove } from '../../utils/ApiCaller'
import useAuthAction from '../auth/action'

const useEventAction = () => {
    const { logout } = useAuthAction()
    const getUpcomingEvents = () =>
        get({ endpoint: '/api/events/upcoming' }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getEvents = (filterString) =>
        get({ endpoint: '/api/events' + filterString }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getMyEvents = (filterString) =>
        get({ endpoint: '/api/Events/my-events' + filterString }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getDetailedEvent = (eventId) =>
        get({ endpoint: `/api/events/${eventId}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const createEvent = (eventData) =>
        post({
            endpoint: '/api/events',
            body: eventData,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const registerEvent = (eventId) =>
        post({
            endpoint: '/api/reservations',
            body: {
                eventId,
            },
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const updateEvent = (eventId, eventData, numberSendingEmail) => {
        const isAllowSendingEmail =
            numberSendingEmail === 1 ? false : eventData.allowEmail === true ? true : false

        return put({
            endpoint: `/api/events/${eventId}?allowEmail=${isAllowSendingEmail ? true : false}`,
            body: eventData,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    }

    const checkIsMyEvent = (id) =>
        get({ endpoint: `/api/events/is-mine/${id}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getMyRegistrations = (filterString) =>
        get({ endpoint: '/api/reservations' + filterString }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const checkCanAttendance = (id) =>
        get({ endpoint: `/api/events/can-take-attendance/${id}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const deleteEvent = (eventId) =>
        remove({ endpoint: `/api/events/${eventId}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const isUpdateEventAvailable = (eventId) =>
        get({ endpoint: `/api/events/is-updatable/${eventId}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    return {
        getUpcomingEvents,
        getEvents,
        getMyEvents,
        createEvent,
        getDetailedEvent,
        registerEvent,
        getMyRegistrations,
        updateEvent,
        checkIsMyEvent,
        checkCanAttendance,
        deleteEvent,
        isUpdateEventAvailable,
    }
}

export default useEventAction
