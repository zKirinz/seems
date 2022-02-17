import React, { useEffect, useRef, useState } from 'react'

import Comments from '../../components/Comments'
import { Box, CircularProgress, FormControl, OutlinedInput } from '@mui/material'

import { useCommentsAction } from '../../recoil/comments'

const CommentsSection = () => {
    const commentContent = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const commentsActions = useCommentsAction()
    const loadCommentsHandler = () => {
        setIsLoading(true)
        commentsActions.loadComments().then((response) => {
            setComments(response.data.data)
        })
        setIsLoading(false)
    }

    const createCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            const commentData = {
                UserId: 1,
                EventId: 1,
                CommentContent: commentContent.current.value,
                parentCommentId: null,
            }
            commentsActions.createComment(commentData).then((response) => {
                const newComment = response.data.data
                setComments((previousComments) => [newComment, ...previousComments])
            })
            commentContent.current.value = ''
        }
    }

    const deleteCommentHandler = (commentId) => {
        commentsActions.deleteComment(commentId).then(() => {
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
            )
        })
    }
    const editCommentHandler = (commentId, commentContent) => {
        commentsActions.editComment(commentId, commentContent).then((response) => {
            const positionIndexComment = comments.findIndex((comment) => comment.id === commentId)
            const newComments = [...comments]
            newComments.splice(positionIndexComment, 1, response.data.data)
            setComments(newComments)
        })
    }
    useEffect(() => {
        loadCommentsHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <React.Fragment>
            <FormControl fullWidth>
                <OutlinedInput
                    placeholder="Write your comment..."
                    size="small"
                    sx={{
                        borderRadius: 8,
                    }}
                    inputRef={commentContent}
                    onKeyDown={createCommentHandler}
                />
            </FormControl>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            <Comments
                comments={comments}
                onDeleteComment={deleteCommentHandler}
                editCommentHandler={editCommentHandler}
            />
        </React.Fragment>
    )
}

export default CommentsSection
