import { NavLink } from 'react-router-dom'

import { Typography, useMediaQuery, CardContent, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const RightDetail = ({ title, content, mode, time }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <CardContent>
            <Typography
                fontWeight={700}
                color="secondary"
                variant={`${matchs ? 'h5' : 'subtitle1'}`}
            >
                {title}
            </Typography>
            <Typography component="p" mt={1.5} sx={{ color: grey[500] }} fontWeight={500}>
                {content}
            </Typography>
            <Typography mt={1.5} color="secondary" fontWeight={700} variant="h5">
                {mode}
            </Typography>
            <Typography color="secondary" variant="h6" sx={{ textDecoration: 'underline' }}>
                {time}
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 6.5 }}
                size="large"
                component={NavLink}
                to="/eventId"
            >
                Read more
            </Button>
        </CardContent>
    )
}

export default RightDetail
