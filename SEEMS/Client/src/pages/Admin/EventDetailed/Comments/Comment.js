import React, { useState, useRef, useEffect } from 'react'

import { useRecoilValue } from 'recoil'

import Comment from '../../../../components/Comment'
import {
    Avatar,
    Box,
    CircularProgress,
    FormControl,
    OutlinedInput,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { useSnackbar } from '../../../../HOCs/SnackbarContext'
import atom from '../../../../recoil/auth'
import { useCommentsAction } from '../../../../recoil/comment'
import ResponseComments from './ResponseComments'

const CommentSection = ({
    onDeleteComment,
    editCommentHandler,
    comment,
    EventId,
    reactCommentHandler,
    setQuantityComment,
}) => {
    const commentsActions = useCommentsAction()
    const showSnackBar = useSnackbar()
    const auth = useRecoilValue(atom)
    const commentContent = useRef(null)
    const initialLoadingComments = useRef(true)
    const [openCommentField, setOpenCommentField] = useState(false)
    const [responseComments, setResponseComment] = useState([])
    const [numberResponseComment, setNumberResponseComment] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMoreComments, setHasMoreComments] = useState(false)
    const [loadMoreCommentsConfig, setLoadMoreCommentsConfig] = useState({
        action: 'reply',
        numberComments: 4,
        lastCommentId: null,
    })
    const replyCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            setIsLoading(true)
            const commentData = {
                EventId: EventId,
                CommentContent: commentContent.current.value,
                ParentCommentId: comment.id,
            }
            commentsActions
                .createComment(commentData)
                .then((response) => {
                    const replication = response.data.data
                    setResponseComment((previousValue) => [replication, ...previousValue])
                    setNumberResponseComment((previousNumber) => previousNumber + 1)
                    setQuantityComment((previousNumber) => previousNumber + 1)
                    commentContent.current.value = ''
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again.',
                    })
                })
        }
    }
    const loadMoreResponseCommentsHandler = () => {
        setIsLoading(true)
        setOpenCommentField(true)
        commentsActions
            .loadComments(loadMoreCommentsConfig, comment.id)
            .then((response) => {
                initialLoadingComments.current = false
                const {
                    listResponseReplyComments: loadedComments,
                    hasMoreComment: isHasMoreComments,
                } = response.data.data
                setResponseComment((prevComments) => [...prevComments, ...loadedComments])
                setHasMoreComments(isHasMoreComments)
                setIsLoading(false)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again.',
                })
                initialLoadingComments.current = false
                setIsLoading(false)
            })
    }
    const openReplyTextBoxHandler = () => {
        setOpenCommentField(true)
        if (initialLoadingComments.current) {
            setIsLoading(true)
            commentsActions
                .loadComments(loadMoreCommentsConfig, comment.id)
                .then((response) => {
                    initialLoadingComments.current = false
                    const {
                        listResponseReplyComments: loadedComments,
                        hasMoreComment: isHasMoreComments,
                    } = response.data.data
                    setResponseComment((prevComments) => [...prevComments, ...loadedComments])
                    setHasMoreComments(isHasMoreComments)
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again.',
                    })
                    initialLoadingComments.current = false
                    setIsLoading(false)
                })
        }
    }
    const editResponseCommentHandler = (id, commentContent) => {
        commentsActions
            .editComment(id, commentContent)
            .then((response) => {
                const positionIndexComment = responseComments.findIndex(
                    (comment) => comment.id === id
                )
                const newComments = [...responseComments]
                newComments.splice(positionIndexComment, 1, response.data.data)
                setResponseComment(newComments)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again.',
                })
            })
    }
    const deleteResponseCommentHandler = (commentId) => {
        commentsActions
            .deleteComment(commentId)
            .then(() => {
                setResponseComment((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                )
                setNumberResponseComment((previousNumber) => previousNumber - 1)
                setQuantityComment((previousNumber) => previousNumber - 1)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again.',
                })
            })
    }
    useEffect(() => {
        hasMoreComments &&
            setLoadMoreCommentsConfig((previousValue) => ({
                ...previousValue,
                lastCommentId: responseComments[responseComments.length - 1].id,
            }))
    }, [hasMoreComments, responseComments])
    useEffect(() => {
        setNumberResponseComment(comment.numberReplyComment)
    }, [comment])
    return (
        <React.Fragment>
            <Box>
                <Comment
                    onDeleteComment={onDeleteComment}
                    editCommentHandler={editCommentHandler}
                    {...comment}
                    loadMoreResponseCommentsHandler={loadMoreResponseCommentsHandler}
                    openResponseCommentField={openCommentField}
                    reactCommentHandler={reactCommentHandler}
                    openReplyTextBoxHandler={openReplyTextBoxHandler}
                />
                {openCommentField && (
                    <Box sx={{ width: '94%', ml: 'auto', mt: 1 }}>
                        {isLoading && initialLoadingComments.current && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <CircularProgress disableShrink size={30} />
                            </Box>
                        )}
                        {isLoading &&
                            !initialLoadingComments.current &&
                            !!commentContent.current?.value.trim() && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <CircularProgress disableShrink />
                                </Box>
                            )}
                        {responseComments.length !== 0 && (
                            <ResponseComments
                                comments={responseComments}
                                editCommentHandler={editResponseCommentHandler}
                                onDeleteComment={deleteResponseCommentHandler}
                                reactCommentHandler={reactCommentHandler}
                            />
                        )}
                        {hasMoreComments && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': { textDecoration: 'underline' },
                                            color: grey[800],
                                            mr: 1,
                                        }}
                                        fontWeight={500}
                                        onClick={loadMoreResponseCommentsHandler}
                                    >
                                        Watch more comments
                                    </Typography>
                                    {isLoading && <CircularProgress disableShrink size={20} />}
                                </Box>
                                {!!comment?.numberReplyComment && (
                                    <Typography sx={{ color: grey[500] }}>
                                        {responseComments.length}/{numberResponseComment}
                                    </Typography>
                                )}
                            </Box>
                        )}
                        {openCommentField && (
                            <Box sx={{ display: 'flex', mt: 1 }}>
                                <Avatar alt="avatar" src={auth.image} />
                                <FormControl fullWidth sx={{ ml: 2 }}>
                                    <OutlinedInput
                                        placeholder="Write your comment..."
                                        size="small"
                                        sx={{
                                            borderRadius: 8,
                                        }}
                                        inputRef={commentContent}
                                        autoFocus
                                        onKeyDown={replyCommentHandler}
                                        multiline
                                        maxRows={20}
                                    />
                                </FormControl>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </React.Fragment>
    )
}

export default CommentSection
