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

    const updateEvent = (eventId, eventData) => {
        return put({ endpoint: `/api/events/${eventId}`, body: eventData })
    }
    return {
        getUpcomingEvents,
        getEvents,
        getMyEvents,
        createEvent,
        getDetailedEvent,
        updateEvent,
    }
}

export default useEventAction
