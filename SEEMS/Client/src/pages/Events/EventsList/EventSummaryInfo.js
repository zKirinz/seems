import { Typography, useMediaQuery, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const EventSummaryInfo = ({ title, content }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <CardContent sx={{ px: { xs: 3, md: 8 }, py: { sx: 2, md: 4 } }}>
            <Typography
                fontWeight={700}
                color="primary"
                variant={`${matches ? 'h6' : 'subtitle1'}`}
            >
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
                variant={`${matches ? 'subtitle2' : 'body2'}`}
            >
                {content}
            </Typography>
        </CardContent>
    )
}

export default EventSummaryInfo
