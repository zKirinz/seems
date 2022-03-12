import { useHistory } from 'react-router-dom'

import {
    Check as CheckIcon,
    Close as CloseIcon,
    OpenInNew as OpenInNewIcon,
    Pending as PendingIcon,
    Feedback as FeedbackIcon,
} from '@mui/icons-material'
import { Box, Card, Chip, Grid } from '@mui/material'

import EventPoster from '../../EventPoster'
import ReservationSummaryInfo from './ReservationSummaryInfo'

const ReservationCard = ({
    id,
    imageUrl,
    title,
    description,
    startDate,
    organizer,
    reservationStatus,
}) => {
    const history = useHistory()

    const eventStartTime = (timeStamp) => {
        const date = new Date(timeStamp)
        return (
            date.toLocaleString('en-US', { dateStyle: 'medium' }) +
            ' - ' +
            date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
        )
    }

    return (
        <Card
            elevation={2}
            sx={{
                position: 'relative',
                maxWidth: 1000,
                width: '100%',
            }}
        >
            <Box px={4}>
                <Grid container>
                    <Grid item xs={3}>
                        <EventPoster src={imageUrl} size="contain" />
                    </Grid>
                    <Grid item xs={9}>
                        <ReservationSummaryInfo title={title} content={description} />
                    </Grid>
                </Grid>
            </Box>
            {reservationStatus === 'Pending' && (
                <Box position="absolute" bottom={175} right={50}>
                    <Chip label="Pending" icon={<PendingIcon />} color="info" variant="outlined" />
                </Box>
            )}
            {reservationStatus === 'Absent' && (
                <Box position="absolute" bottom={175} right={50}>
                    <Chip label="Absent" icon={<CloseIcon />} color="error" variant="outlined" />
                </Box>
            )}
            {reservationStatus === 'Attended' && (
                <Box position="absolute" bottom={175} right={50}>
                    <Chip
                        label="It's time for feedback"
                        icon={<FeedbackIcon />}
                        color="warning"
                        variant="outlined"
                    />
                </Box>
            )}
            {reservationStatus === 'Feedbacked' && (
                <Box position="absolute" bottom={175} right={50}>
                    <Chip
                        label="Thank you for your feedback"
                        icon={<CheckIcon />}
                        color="success"
                        variant="outlined"
                    />
                </Box>
            )}
            <Box
                position="absolute"
                bottom={30}
                right={50}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Chip label={organizer} color="primary" variant="outlined" />
                <Chip
                    label={eventStartTime(startDate)}
                    color="primary"
                    variant="outlined"
                    sx={{ mx: 1 }}
                />
                <Chip
                    label="Read More"
                    color="secondary"
                    onClick={() => history.push(`/events/${id}`)}
                    onDelete={() => history.push(`/events/${id}`)}
                    deleteIcon={<OpenInNewIcon />}
                />
            </Box>
        </Card>
    )
}

export default ReservationCard
