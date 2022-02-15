import { get, post } from '../../utils/ApiCaller'

const useCommentsAction = () => {
    const loadComments = () => {
        return get({
            endpoint: '/api/comments/1',
        })
    }
    const createComment = (commentData) => {
        console.log(commentData)
        return post({
            endpoint: '/api/comments',
            body: commentData,
        })
    }
    return {
        loadComments,
        createComment,
    }
}

export default useCommentsAction
