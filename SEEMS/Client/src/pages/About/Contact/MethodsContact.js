import React from 'react'

import { Phone } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import { Card, CardContent, IconButton, Typography } from '@mui/material'

const MethodsContact = ({ name, content }) => {
    return (
        <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <IconButton color="primary" size="large">
                    {name === 'Email' ? <EmailIcon /> : name === 'Phone' ? <Phone /> : <HomeIcon />}
                </IconButton>
                <Typography variant="h6">{name}</Typography>
                <Typography paragraph variant="body2">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MethodsContact
