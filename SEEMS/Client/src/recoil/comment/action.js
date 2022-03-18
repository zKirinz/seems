import { post, put, remove } from '../../utils/ApiCaller'
import useAuthAction from '../auth/action'

const useCommentsAction = () => {
    const { logout } = useAuthAction()
    const loadComments = (commentConfig, eventId) => {
        return post({
            endpoint: `/api/comments/${eventId}`,
            body: commentConfig,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    }
    const createComment = (commentData) => {
        return post({
            endpoint: '/api/comments',
            body: commentData,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    }
    const deleteComment = (commentId) => {
        return remove({
            endpoint: `/api/comments/${commentId}`,
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    }
    const editComment = (commentId, commentContent) => {
        return put({
            endpoint: `/api/comments/${commentId}`,
            body: { commentContent: commentContent },
        }).then((res) => {
            if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                logout()
                window.location.reload(false)
            }
            return res
        })
    }
    return {
        loadComments,
        createComment,
        deleteComment,
        editComment,
    }
}

export default useCommentsAction
