import { Typography, useMediaQuery, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const EventSummaryInfo = ({ title, content, time }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <CardContent sx={{ px: { xs: 3, md: 8 }, py: { sx: 2, md: 4 } }}>
            <Typography fontWeight={700} color="secondary" variant={`${matches ? 'h5' : 'h6'}`}>
                {title}
            </Typography>
            <Typography
                component="p"
                mt={1.5}
                sx={{ color: grey[500] }}
                fontWeight={500}
                variant={`${matches ? 'subtitle1' : 'subtitle2'}`}
            >
                {content}
            </Typography>
            <Typography color="secondary" variant="h6" sx={{ textDecoration: 'underline' }} mb={1}>
                {time}
            </Typography>
        </CardContent>
    )
}

export default EventSummaryInfo
