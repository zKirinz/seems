import { post } from '../../utils/ApiCaller'

const useFeedbackAction = () => {
    const createFeedback = (feedbackContent) =>
        post({ endpoint: '/api/feedbacks', body: feedbackContent })

    return {
        createFeedback,
    }
}

export default useFeedbackAction
