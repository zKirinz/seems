import { get } from '../../utils/ApiCaller'

const useCommentsAction = () => {
    const loadComments = () => {
        return get({
            endpoint: '/api/comments/1',
        })
    }
    return {
        loadComments,
    }
}

export default useCommentsAction
