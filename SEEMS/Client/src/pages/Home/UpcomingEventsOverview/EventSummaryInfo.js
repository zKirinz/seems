import { Typography, useMediaQuery, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const EventSummaryInfo = ({ title, content, startTime }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const timeStamp = new Date(startTime)
    const eventStartTime =
        timeStamp.toLocaleString('en-US', { dateStyle: 'long' }) +
        ' - ' +
        timeStamp.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })

    return (
        <CardContent sx={{ px: { xs: 3, md: 8 }, py: { sx: 2, md: 4 } }}>
            <Typography fontWeight={700} color="primary" variant={`${matches ? 'h5' : 'h6'}`}>
                {title}
            </Typography>
            <Typography
                component="p"
                mt={1.5}
                sx={{
                    color: grey[500],
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '3',
                    textOverflow: 'ellipsis',
                }}
                fontWeight={500}
                variant={`${matches ? 'subtitle1' : 'subtitle2'}`}
            >
                {content}
            </Typography>
            <Typography color="secondary" variant="h6" mb={1}>
                {eventStartTime}
            </Typography>
        </CardContent>
    )
}

export default EventSummaryInfo
