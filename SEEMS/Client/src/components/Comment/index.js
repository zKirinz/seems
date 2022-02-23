import React, { useState } from 'react'

import moment from 'moment'
import { useRecoilValue } from 'recoil'

import { Clear, Edit, SubdirectoryArrowRight } from '@mui/icons-material'
import { Avatar, Box, IconButton, OutlinedInput, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

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
    parentCommentId,
    reactCommentHandler,
    isLike,
}) => {
    const [isEditCommentContent, setIsEditCommentContent] = useState(false)
    const auth = useRecoilValue(atom)
    const [likeComment, setLikeComment] = useState({
        isLike: isLike,
        numberReplyComment: numberReplyComment,
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
            <Box width="100%" display="flex" flexDirection="column">
                <Box
                    sx={{
                        ml: 2,
                        bgcolor: grey[300],
                        px: 3,
                        py: 2,
                        borderRadius: 8,
                        width: '95%',
                        position: 'relative',
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: grey[800] }}>
                        {userName}
                    </Typography>
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
                    >
                        Are you sure you want to delete this comment?
                    </AlertConfirm>
                    {email === auth.email && (
                        <>
                            <IconButton
                                aria-label="delete comment"
                                component="span"
                                sx={{ position: 'absolute', right: 10, top: 10, color: grey[900] }}
                                onClick={openDialog}
                            >
                                <Clear />
                            </IconButton>
                            {!isEditCommentContent && (
                                <IconButton
                                    aria-label="edit comment"
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        right: 40,
                                        top: 10,
                                        color: grey[900],
                                    }}
                                    onClick={onOpenEditCommentField}
                                >
                                    <Edit />
                                </IconButton>
                            )}
                        </>
                    )}
                </Box>
                <Box sx={{ ml: 5, mt: 1 }}>
                    <Typography component="span" sx={{ mr: 0.5 }}>
                        {!!likeComment.numberReplyComment && likeComment.numberReplyComment}
                    </Typography>
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
                        <Typography
                            component="span"
                            variant="body2"
                            fontWeight={700}
                            sx={{
                                color: grey[900],
                                '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
                                mr: 2,
                            }}
                            onClick={loadMoreResponseCommentsHandler}
                        >
                            Reply
                        </Typography>
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
