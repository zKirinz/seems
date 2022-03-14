import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import {
    Check as CheckIcon,
    Close as CloseIcon,
    OpenInNew as OpenInNewIcon,
    EventAvailable as EventAvailableIcon,
} from '@mui/icons-material'
import { Box, Card, Chip, Grid } from '@mui/material'

import authAtom from '../../../recoil/auth'
import EventPoster from '../../EventPoster'
import EventSummaryInfo from './EventSummaryInfo'

const EventCard = ({
    id,
    canRegister,
    imageUrl,
    title,
    description,
    startDate,
    organizer,
    isAdmin,
}) => {
    const auth = useRecoilValue(authAtom)
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
                        <EventSummaryInfo title={title} content={description} />
                    </Grid>
                </Grid>
            </Box>
            {auth.email && auth.role !== 'Admin' && (
                <Box position="absolute" bottom={175} right={50}>
                    {auth.organization === organizer ? (
                        <Chip
                            label="This is your event"
                            icon={<EventAvailableIcon />}
                            color="info"
                            variant="outlined"
                        />
                    ) : (
                        <Chip
                            label={
                                canRegister
                                    ? 'Available for registration'
                                    : 'Not available for registration'
                            }
                            icon={canRegister ? <CheckIcon /> : <CloseIcon />}
                            color={canRegister ? 'success' : 'warning'}
                            variant="outlined"
                        />
                    )}
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
                {auth.email && (
                    <Chip
                        label={
                            auth.organization !== organizer && canRegister
                                ? 'Register'
                                : 'Read More'
                        }
                        color="secondary"
                        onClick={() =>
                            history.push(isAdmin ? `/admin/events/${id}` : `/events/${id}`)
                        }
                        onDelete={() =>
                            history.push(isAdmin ? `/admin/events/${id}` : `/events/${id}`)
                        }
                        deleteIcon={<OpenInNewIcon />}
                    />
                )}
            </Box>
        </Card>
    )
}

export default EventCard
