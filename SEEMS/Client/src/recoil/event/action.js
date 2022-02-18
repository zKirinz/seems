import { useHistory } from 'react-router-dom'

import { get, post } from '../../utils/ApiCaller'

const useEventAction = () => {
    const history = useHistory()

    const getUpcomingEvents = () => get({ endpoint: '/api/events/upcoming' })

    const getMyEvents = () => get({ endpoint: '/api/Events/my-events' })

    const createEvent = (eventData) =>
        post({
            endpoint: '/api/events',
            body: eventData,
        }).then(() => history.push('/events'))

    return {
        getUpcomingEvents,
        getMyEvents,
        createEvent,
    }
}

export default useEventAction
