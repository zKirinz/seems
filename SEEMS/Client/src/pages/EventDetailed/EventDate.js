import moment from 'moment'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const EventDate = ({ nameDate, date }) => {
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
            <Typography variant="h6" fontWeight={500} color="secondary" sx={{ my: 1 }}>
                {moment(date).format('MMMM Do YYYY, h:mm a')}
            </Typography>
            <Typography fontWeight={500}>{moment(date).format('dddd')}</Typography>
        </Box>
    )
}

export default EventDate
