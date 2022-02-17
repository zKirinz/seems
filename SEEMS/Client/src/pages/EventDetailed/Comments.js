import React, { useRef, useState } from 'react'

import Comments from '../../components/Comments'
import { ModeComment } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    OutlinedInput,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { useCommentsAction } from '../../recoil/comment'

let isLoadedOnce = true

const CommentsSection = () => {
    const commentContent = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [openCommentField, setOpenCommentField] = useState(false)
    const commentsActions = useCommentsAction()
    const loadCommentsHandler = () => {
        if (isLoadedOnce) {
            setIsLoading(true)
            setOpenCommentField(true)
            commentsActions
                .loadComments()
                .then((response) => {
                    setComments(response.data.data)
                })
                .then(() => {
                    setIsLoading(false)
                })
            isLoadedOnce = false
        }
    }

    const createCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            setIsLoading(true)
            const commentData = {
                UserId: 1,
                EventId: 1,
                CommentContent: commentContent.current.value,
                parentCommentId: null,
            }
            commentsActions
                .createComment(commentData)
                .then((response) => {
                    const newComment = response.data.data
                    setComments((previousComments) => [newComment, ...previousComments])
                    commentContent.current.value = ''
                })
                .then(() => {
                    setIsLoading(false)
                })
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
    return (
        <React.Fragment>
            <Box sx={{ mb: 2 }}>
                <Divider sx={{ mb: 1 }} />
                <Button
                    startIcon={<ModeComment />}
                    sx={{ color: grey[500] }}
                    onClick={loadCommentsHandler}
                >
                    Comment
                </Button>
                <Divider sx={{ mt: 1 }} />
            </Box>
            {openCommentField && (
                <Box sx={{ display: 'flex' }}>
                    <Avatar
                        alt="avatar"
                        src="https://lh3.googleusercontent.com/a-/AOh14GgKvY8rY_AslokA1cZIAA7E92d1bNkdQgZCZ0az=s96-c"
                    />
                    <FormControl fullWidth sx={{ ml: 2 }}>
                        <OutlinedInput
                            placeholder="Write your comment..."
                            size="small"
                            sx={{
                                borderRadius: 8,
                            }}
                            autoFocus
                            inputRef={commentContent}
                            onKeyDown={createCommentHandler}
                        />
                    </FormControl>
                </Box>
            )}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress disableShrink />
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
