import { useHistory } from 'react-router-dom'

import { post } from '../../utils/ApiCaller'

const useEventAction = () => {
    const history = useHistory()

    const createEvent = async (eventData) =>
        post({
            endpoint: '/api/events',
            body: eventData,
        }).then(() => history.push('/events'))

    return {
        createEvent,
    }
}

export default useEventAction
