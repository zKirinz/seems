import { get, post } from '../../utils/ApiCaller'

const useFeedbackAction = () => {
    const createFeedback = (feedbackContent) =>
        post({ endpoint: '/api/feedbacks', body: feedbackContent })

    const checkCanFeedback = (eventId) => get({ endpoint: `/api/feedbacks/canFeedback/${eventId}` })

    const getFeedbacksOfEvent = (eventId) => post({ endpoint: `/api/feedbacks/${eventId}` })

    return {
        createFeedback,
        checkCanFeedback,
        getFeedbacksOfEvent,
    }
}

export default useFeedbackAction
