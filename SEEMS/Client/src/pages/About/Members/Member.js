import { Card, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material'

import { useTheme } from '@emotion/react'

const Member = ({ name, role, src, grade }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia component="img" alt={name} height="300" image={src} />
            <CardContent>
                <Typography
                    gutterBottom
                    variant={`${matchs ? 'h6' : 'h5'}`}
                    color="primary"
                    fontWeight={700}
                >
                    {name} {grade}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
                    {role}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Member
