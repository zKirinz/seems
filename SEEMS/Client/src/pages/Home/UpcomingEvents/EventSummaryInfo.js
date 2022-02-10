import { NavLink } from 'react-router-dom'

import { Typography, useMediaQuery, CardContent, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const EventSummaryInfo = ({ title, content, mode, time, eventId }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <CardContent sx={{ p: 4 }}>
            <Typography fontWeight={700} color="secondary" variant={`${matchs ? 'h5' : 'h6'}`}>
                {title}
            </Typography>
            <Typography
                component="p"
                mt={1.5}
                sx={{ color: grey[500] }}
                fontWeight={500}
                variant={`${matchs ? 'subtitle1' : 'subtitle2'}`}
            >
                {content}
            </Typography>
            <Typography
                my={1.5}
                color="secondary"
                fontWeight={700}
                variant={`${matchs ? 'h5' : 'subtitle1'}`}
            >
                {mode}
            </Typography>
            <Typography color="secondary" variant="h6" sx={{ textDecoration: 'underline' }} mb={1}>
                {time}
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 6 }}
                size="large"
                component={NavLink}
                to={`/events/${eventId}`}
            >
                Read more
            </Button>
        </CardContent>
    )
}

export default EventSummaryInfo
