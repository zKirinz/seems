import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const EventDate = ({ nameDate, dateTime, dateInWeek }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
            }}
        >
            <Typography variant="h4" fontWeight={700} sx={{ fontStyle: 'italic' }}>
                {nameDate}
            </Typography>
            <Typography variant="h6" fontWeight={500} color="secondary">
                {dateTime}
            </Typography>
            <Typography>{dateInWeek}</Typography>
        </Box>
    )
}

export default EventDate
