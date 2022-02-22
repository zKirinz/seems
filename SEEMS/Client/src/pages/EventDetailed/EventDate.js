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
            <Typography variant="h5" fontWeight={500} color="primary" sx={{ my: 1 }}>
                {moment(date).format('MMM Do YYYY')}
            </Typography>
            <Typography variant="h6">{moment(date).format('HH:mm A')}</Typography>
        </Box>
    )
}

export default EventDate
