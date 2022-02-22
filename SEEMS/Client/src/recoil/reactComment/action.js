import { put } from '../../utils/ApiCaller'

const useReactComment = () => {
    const reactComment = (commentId) => {
        return put({ endpoint: '/api/comments', body: { reactCommentId: commentId } })
    }
    return {
        reactComment,
    }
}

export default useReactComment
