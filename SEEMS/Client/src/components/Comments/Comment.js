import React, { useState } from 'react'

import { useRecoilValue } from 'recoil'

import { Clear, Edit } from '@mui/icons-material'
import { Avatar, Box, IconButton, OutlinedInput, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import atom from '../../recoil/auth'

const Comment = ({
    userName,
    imageUrl: src,
    alt,
    commentContent,
    email,
    onDeleteComment,
    id,
    editCommentHandler,
}) => {
    const [isEditCommentContent, setIsEditCommentContent] = useState(false)
    const auth = useRecoilValue(atom)
    const [inputCommentText, setInputCommentText] = useState(null)
    const onEditComment = (event) => {
        if (event.target.value.trim().length !== 0 && event.key === 'Enter') {
            editCommentHandler(id, inputCommentText)
            setIsEditCommentContent(false)
        }
    }
    const onClickEditCommentIcon = () => {
        setInputCommentText(commentContent)
        setIsEditCommentContent(true)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}>
            <Avatar alt={alt} src={src}></Avatar>
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
                <Typography variant="subtitle1" fontWeight={500}>
                    {userName}
                </Typography>
                {!isEditCommentContent && <Typography paragraph>{commentContent}</Typography>}
                {isEditCommentContent && (
                    <OutlinedInput
                        value={inputCommentText}
                        size="small"
                        sx={{
                            borderRadius: 8,
                        }}
                        onChange={(event) => setInputCommentText(event.target.value)}
                        onKeyDown={onEditComment}
                    />
                )}
                {email === auth.email && (
                    <>
                        <IconButton
                            aria-label="delete comment"
                            component="span"
                            sx={{ position: 'absolute', right: 10, top: 10, color: grey[900] }}
                            onClick={() => onDeleteComment(id)}
                        >
                            <Clear />
                        </IconButton>
                        {!isEditCommentContent && (
                            <IconButton
                                aria-label="edit comment"
                                component="span"
                                sx={{ position: 'absolute', right: 40, top: 10, color: grey[900] }}
                                onClick={onClickEditCommentIcon}
                            >
                                <Edit />
                            </IconButton>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default Comment
