import { get, post } from '../../utils/ApiCaller'
import useAuthAction from '../auth/action'

const useFeedbackAction = () => {
    const { logout } = useAuthAction()
    const createFeedback = (feedbackContent) =>
        post({ endpoint: '/api/feedbacks', body: feedbackContent }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const checkCanFeedback = (eventId) =>
        get({ endpoint: `/api/feedbacks/canFeedback/${eventId}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    const getFeedbacksOfEvent = (eventId) =>
        post({ endpoint: `/api/feedbacks/${eventId}` }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })

    return {
        createFeedback,
        checkCanFeedback,
        getFeedbacksOfEvent,
    }
}

export default useFeedbackAction
