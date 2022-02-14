import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { post } from '../../utils/ApiCaller'
import atom from '../auth'

const useEventAction = () => {
    const history = useHistory()
    const auth = useRecoilValue(atom)
    const createEvent = async (eventData) => {
        const token = auth.token
        try {
            await post({
                endpoint: '/api/events',
                body: eventData,
                headers: { token },
            })
            history.push('/events')
        } catch (error) {
            throw error.response
        }
    }
    return {
        createEvent,
    }
}
export default useEventAction
