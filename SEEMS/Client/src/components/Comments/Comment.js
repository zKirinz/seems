import React from 'react'

import { useRecoilValue } from 'recoil'

import { Clear } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import atom from '../../recoil/auth'

const Comment = ({ userName, imageUrl: src, alt, commentContent, email, onDeleteComment, id }) => {
    const auth = useRecoilValue(atom)
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
                <Typography paragraph>{commentContent}</Typography>
                {email === auth.email && (
                    <IconButton
                        aria-label="delete comment"
                        component="span"
                        sx={{ position: 'absolute', right: 10, top: 10, color: grey[900] }}
                        onClick={() => onDeleteComment(id)}
                    >
                        <Clear />
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}

export default Comment
