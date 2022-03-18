import { put } from '../../utils/ApiCaller'
import useAuthAction from '../auth/action'

const useReactComment = () => {
    const { logout } = useAuthAction()
    const reactComment = (commentId) => {
        return put({ endpoint: '/api/comments', body: { reactCommentId: commentId } }).then(
            (res) => {
                if (res.data.data && res.data.data.errorCode === 'BANNED_USER') {
                    logout()
                    window.location.reload(false)
                }
                return res
            }
        )
    }
    return {
        reactComment,
    }
}

export default useReactComment
