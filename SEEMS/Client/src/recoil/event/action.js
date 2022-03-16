import { get, post, put } from '../../utils/ApiCaller'

const useEventAction = () => {
    const getUpcomingEvents = () => get({ endpoint: '/api/events/upcoming' })

    const getEvents = (filterString) => get({ endpoint: '/api/events' + filterString })

    const getMyEvents = (filterString) => get({ endpoint: '/api/Events/my-events' + filterString })

    const getDetailedEvent = (eventId) => get({ endpoint: `/api/events/${eventId}` })

    const createEvent = (eventData) =>
        post({
            endpoint: '/api/events',
            body: eventData,
        })

    const registerEvent = (eventId) =>
        post({
            endpoint: '/api/reservations',
            body: {
                eventId,
            },
        })

    const updateEvent = (eventId, eventData) =>
        put({ endpoint: `/api/events/${eventId}`, body: eventData })

    const checkIsMyEvent = (id) => get({ endpoint: `/api/events/is-mine/${id}` })

    const getMyRegistrations = (filterString) =>
        get({ endpoint: '/api/reservations' + filterString })

    const checkCanAttendance = (id) => get({ endpoint: `/api/events/can-take-attendance/${id}` })

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
    }
}

export default useEventAction
