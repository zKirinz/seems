import React from 'react'

import { Phone } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import { Card, CardContent, IconButton, Typography } from '@mui/material'

const MethodsContact = ({ name, content }) => {
    return (
        <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
                <IconButton color="primary" size="large">
                    {name === 'Email' ? <EmailIcon /> : name === 'Phone' ? <Phone /> : <HomeIcon />}
                </IconButton>
                <Typography>{name}</Typography>
                <Typography paragraph>{content}</Typography>
            </CardContent>
        </Card>
    )
}

export default MethodsContact
