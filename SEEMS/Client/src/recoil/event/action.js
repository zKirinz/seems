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

    const updateEvent = (eventId, eventData) =>
        put({
            endpoint: `/api/events/${eventId}?allowEmail=${eventData.allowEmail ? true : false}`,
            body: eventData,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

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

    const deleteEvent = (eventId) => {
        return remove({ endpoint: `/api/events/${eventId}` })
    }

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
    }
}

export default useEventAction
