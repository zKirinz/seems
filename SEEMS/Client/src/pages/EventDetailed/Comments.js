import React, { useRef, useState, useEffect } from 'react'

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
    Typography,
} from '@mui/material'

import { useCommentsAction } from '../../recoil/comment'

let initialLoadingComments = false
const CommentsSection = () => {
    const commentsActions = useCommentsAction()
    const commentContent = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [hasMoreComments, setHasMoreComments] = useState(false)
    const [openCommentField, setOpenCommentField] = useState(false)
    const [loadMoreCommentsConfig, setLoadMoreCommentsConfig] = useState({
        numberComments: 5,
        lastCommentId: null,
    })
    const loadCommentsHandler = () => {
        setIsLoading(true)
        setOpenCommentField(true)
        commentsActions
            .loadComments(loadMoreCommentsConfig)
            .then((response) => {
                const { listResponseComments: loadedComments, hasMoreComment: isHasMoreComments } =
                    response.data.data
                setComments((prevComments) => [...prevComments, ...loadedComments])
                setHasMoreComments(isHasMoreComments)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
        initialLoadingComments = true
    }
    const createCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            setIsLoading(true)
            const commentData = {
                UserId: 1,
                EventId: 4,
                CommentContent: commentContent.current.value,
                ParentCommentId: null,
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
                .catch(() => {
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
    useEffect(() => {
        hasMoreComments &&
            setLoadMoreCommentsConfig((previousValue) => ({
                ...previousValue,
                lastCommentId: comments[comments.length - 1].id,
            }))
    }, [hasMoreComments, comments])
    return (
        <React.Fragment>
            <Box sx={{ mb: 2 }}>
                <Divider sx={{ mb: 1 }} />
                <Button
                    startIcon={<ModeComment />}
                    color="primary"
                    onClick={loadCommentsHandler}
                    disabled={!initialLoadingComments}
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
            {hasMoreComments && (
                <Typography
                    variant="body2"
                    sx={{ mt: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    fontWeight={400}
                    onClick={loadCommentsHandler}
                >
                    Watch more comments
                    <CircularProgress disableShrink />
                </Typography>
            )}
        </React.Fragment>
    )
}

export default CommentsSection
