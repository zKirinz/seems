import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Box, Button, Card, Grid, Typography } from '@mui/material'

import authAtom from '../../recoil/auth'
import EventPoster from '../EventPoster'
import EventSummaryInfo from './EventSummaryInfo'

const EventCard = ({ id, imageUrl, title, description, startDate, organizer, isAdmin }) => {
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
        <Card elevation={3} sx={{ position: 'relative', maxWidth: 1000, width: '100%' }}>
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
            <Box
                position="absolute"
                bottom={30}
                right={50}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Typography color="secondary" variant="subtitle1" my={1}>
                    <Box component="strong" sx={{ color: 'primary.main' }}>
                        Organizer - {organizer}
                    </Box>{' '}
                    / {eventStartTime(startDate)}
                </Typography>
                {auth.email && (
                    <Box>
                        {!isAdmin && (
                            <Button
                                variant="contained"
                                onClick={() => history.push(`/events/register/${id}`)}
                                sx={{ mx: 1 }}
                            >
                                Register
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                history.push(isAdmin ? `/admin/events/${id}` : `/events/${id}`)
                            }
                            sx={{ mx: 1 }}
                        >
                            Read More
                        </Button>
                    </Box>
                )}
            </Box>
        </Card>
    )
}

export default EventCard
