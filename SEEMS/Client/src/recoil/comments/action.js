import { get, post, remove } from '../../utils/ApiCaller'

const useCommentsAction = () => {
    const loadComments = () => {
        return get({
            endpoint: '/api/comments/1',
        })
    }
    const createComment = (commentData) => {
        return post({
            endpoint: '/api/comments',
            body: commentData,
        })
    }
    const deleteComment = (commentId) => {
        return remove({
            endpoint: `/api/comments/${commentId}`,
        })
    }
    return {
        loadComments,
        createComment,
        deleteComment,
    }
}

export default useCommentsAction
