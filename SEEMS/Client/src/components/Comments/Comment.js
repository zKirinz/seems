import React, { useState } from 'react'

import moment from 'moment'
import { useRecoilValue } from 'recoil'

import { Clear, Edit } from '@mui/icons-material'
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
}) => {
    const [isEditCommentContent, setIsEditCommentContent] = useState(false)
    const auth = useRecoilValue(atom)
    const [inputCommentText, setInputCommentText] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState(false)
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
                        p: 2,
                        borderRadius: 8,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: grey[600] }}>
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
                <Typography
                    component="span"
                    variant="body2"
                    sx={{ ml: 5, mt: 1, color: grey[800] }}
                >
                    {moment(new Date(createdAt)).fromNow(true)}
                </Typography>
            </Box>
        </Box>
    )
}

export default Comment
