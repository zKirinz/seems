import React from 'react'

import { Avatar, Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const Comment = ({ username, userAvatar: src, alt, content }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}>
            <Avatar alt={alt} src={src}></Avatar>
            <Box sx={{ ml: 2, bgcolor: grey[300], p: 2, borderRadius: 8 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                    {username}
                </Typography>
                <Typography paragraph>{content}</Typography>
            </Box>
        </Box>
    )
}

export default Comment
