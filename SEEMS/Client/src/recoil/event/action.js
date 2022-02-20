import { useHistory } from 'react-router-dom'

import { get, post } from '../../utils/ApiCaller'

const useEventAction = () => {
    const history = useHistory()

    const getUpcomingEvents = () => get({ endpoint: '/api/events/upcoming' })

    const getMyEvents = () => get({ endpoint: '/api/Events/my-events' })

    const getDetailedEvent = (eventId) => get({ endpoint: `/api/events/detail/${eventId}` })

    const createEvent = (eventData) =>
        post({
            endpoint: '/api/events',
            body: eventData,
        }).then(() => history.push('/events'))

    return {
        getUpcomingEvents,
        getMyEvents,
        createEvent,
        getDetailedEvent,
    }
}

export default useEventAction
