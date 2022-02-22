import React, { useRef, useState, useEffect } from 'react'

import { useRecoilValue } from 'recoil'

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
import { grey } from '@mui/material/colors'

import authAtom from '../../recoil/auth/atom'
import { useCommentsAction } from '../../recoil/comment'

const CommentsSection = ({ eventId: EventId }) => {
    const commentsActions = useCommentsAction()
    const auth = useRecoilValue(authAtom)
    const commentContent = useRef(null)
    const initialLoadingComments = useRef(true)
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [hasMoreComments, setHasMoreComments] = useState(false)
    const [openCommentField, setOpenCommentField] = useState(false)
    const [loadMoreCommentsConfig, setLoadMoreCommentsConfig] = useState({
        numberComments: 4,
        lastCommentId: null,
    })
    const loadCommentsHandler = () => {
        setIsLoading(true)
        if (initialLoadingComments.current) {
            setOpenCommentField(true)
        }
        commentsActions
            .loadComments(loadMoreCommentsConfig, EventId)
            .then((response) => {
                initialLoadingComments.current = false
                const { listResponseComments: loadedComments, hasMoreComment: isHasMoreComments } =
                    response.data.data
                setComments((prevComments) => [...prevComments, ...loadedComments])
                setHasMoreComments(isHasMoreComments)
                setIsLoading(false)
            })
            .catch(() => {
                initialLoadingComments.current = false
                setIsLoading(false)
            })
    }
    const createCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            setIsLoading(true)
            const commentData = {
                EventId: EventId,
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
                    disabled={!initialLoadingComments.current}
                >
                    Comment
                </Button>
                <Divider sx={{ mt: 1 }} />
            </Box>
            {openCommentField && (
                <Box sx={{ display: 'flex' }}>
                    <Avatar alt="avatar" src={auth.image} />
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
            {isLoading && initialLoadingComments.current && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress disableShrink />
                </Box>
            )}
            {isLoading &&
                !initialLoadingComments.current &&
                !!commentContent.current?.value.trim() && (
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                            color: grey[500],
                            mr: 1,
                        }}
                        fontWeight={500}
                        onClick={loadCommentsHandler}
                    >
                        Watch more comments
                    </Typography>
                    {isLoading && <CircularProgress disableShrink size={20} />}
                </Box>
            )}
        </React.Fragment>
    )
}

export default CommentsSection
