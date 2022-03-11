import React, { useState } from 'react'

import moment from 'moment'
import { useRecoilValue } from 'recoil'

import { Clear, Edit, SubdirectoryArrowRight, ThumbUpAlt } from '@mui/icons-material'
import { Avatar, Box, IconButton, Link, OutlinedInput, Typography } from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'

import atom from '../../recoil/auth'
import AlertConfirm from '../ConfirmDialog'

const Comment = ({
    userName,
    imageUrl: src,
    alt,
    commentContent,
    email,
    onDeleteComment,
    id,
    editCommentHandler,
    createdAt,
    loadMoreResponseCommentsHandler,
    openResponseCommentField,
    numberReplyComment,
    numberLikeComment,
    parentCommentId,
    reactCommentHandler,
    openReplyTextBoxHandler,
    isLike,
}) => {
    const [isEditCommentContent, setIsEditCommentContent] = useState(false)
    const auth = useRecoilValue(atom)
    const [likeComment, setLikeComment] = useState({
        isLike: isLike,
        numberLikeComment: numberLikeComment,
    })
    const [inputCommentText, setInputCommentText] = useState(commentContent)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const like = likeComment.isLike ? blue[500] : grey[900]
    const onEditComment = (event) => {
        if (event.target.value.trim().length !== 0 && event.key === 'Enter') {
            editCommentHandler(id, inputCommentText)
            setIsEditCommentContent(false)
        }
    }
    const openDialog = () => {
        setConfirmDialog(true)
    }
    const closeDialog = () => {
        setConfirmDialog(false)
    }
    const onConfirmDelete = () => {
        onDeleteComment(id)
    }
    const onOpenEditCommentField = () => {
        setInputCommentText(commentContent)
        setIsEditCommentContent(true)
    }
    const onCloseEditCommentField = () => {
        setIsEditCommentContent(false)
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}>
            <Avatar alt={alt} src={src}></Avatar>
            <Box display="flex" flexDirection="column">
                <Box
                    sx={{
                        ml: 2,
                        bgcolor: grey[300],
                        px: 3,
                        py: 2,
                        borderRadius: 8,
                        position: 'relative',
                    }}
                >
                    {!!likeComment.numberLikeComment && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: -12,
                                right: 10,
                                bgcolor: blueGrey[100],
                                py: 0.25,
                                px: 0.5,
                                borderRadius: 8,
                            }}
                        >
                            <ThumbUpAlt
                                fontSize="small"
                                sx={{ color: `${blue[500]} !important` }}
                            />
                            {likeComment.numberLikeComment > 1 && (
                                <Typography component="span" sx={{ mx: 0.5 }} variant="body2">
                                    {likeComment.numberLikeComment}
                                </Typography>
                            )}
                        </Box>
                    )}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.5 }}
                    >
                        <Typography variant="subtitle1" fontWeight={600} sx={{ color: grey[800] }}>
                            {userName}
                        </Typography>
                        <Box sx={{ ml: 5 }}>
                            {email === auth.email && (
                                <>
                                    {!isEditCommentContent && (
                                        <IconButton
                                            aria-label="edit comment"
                                            component="span"
                                            sx={{ color: grey[900] }}
                                            onClick={onOpenEditCommentField}
                                            size="small"
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        aria-label="delete comment"
                                        component="span"
                                        sx={{ color: grey[900] }}
                                        onClick={openDialog}
                                        size="small"
                                    >
                                        <Clear fontSize="small" />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </Box>
                    {!isEditCommentContent && (
                        <Typography paragraph sx={{ mb: 0 }}>
                            {commentContent}
                        </Typography>
                    )}
                    {isEditCommentContent && (
                        <>
                            <OutlinedInput
                                value={inputCommentText}
                                size="small"
                                sx={{
                                    borderRadius: 8,
                                }}
                                onChange={(event) => setInputCommentText(event.target.value)}
                                onKeyDown={onEditComment}
                                autoFocus
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    mx: 2,
                                    my: 0.5,
                                    color: blue[600],
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={onCloseEditCommentField}
                            >
                                Cancel
                            </Typography>
                        </>
                    )}
                    <AlertConfirm
                        title="Delete comment?"
                        open={confirmDialog}
                        onConfirm={onConfirmDelete}
                        onClose={closeDialog}
                        btnConfirmText="Delete"
                    >
                        Are you sure you want to delete this comment?
                    </AlertConfirm>
                </Box>
                <Box sx={{ ml: 5, mt: 1 }}>
                    <Typography
                        component="span"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                            mr: 2,
                            color: like,
                        }}
                        onClick={() => reactCommentHandler(id, setLikeComment)}
                        fontWeight={500}
                    >
                        Like
                    </Typography>
                    {!parentCommentId && (
                        <Link
                            underline="hover"
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: grey[900], cursor: 'pointer', mr: 2 }}
                            onClick={openReplyTextBoxHandler}
                        >
                            Reply
                        </Link>
                    )}
                    <Typography component="span" variant="body2" sx={{ color: grey[800] }}>
                        {moment(new Date(createdAt)).fromNow(true)}
                    </Typography>
                    {!!numberReplyComment && !openResponseCommentField && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                                <SubdirectoryArrowRight />
                            </IconButton>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: grey[700],
                                    mt: 0.5,
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={loadMoreResponseCommentsHandler}
                            >
                                {numberReplyComment} response
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Comment
