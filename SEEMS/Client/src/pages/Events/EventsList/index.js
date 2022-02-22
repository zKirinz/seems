import React, { useEffect, useState } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import EventPoster from '../../../components/EventPoster'
import { EventBusy as EventBusyIcon } from '@mui/icons-material'
import {
    Grid,
    Card,
    Box,
    Button,
    useMediaQuery,
    useTheme,
    Alert,
    Link,
    Typography,
} from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import authAtom from '../../../recoil/auth'
import useEventAction from '../../../recoil/event/action'
import EventSummaryInfo from './EventSummaryInfo'

const EventsList = ({ nameFilter = '' }) => {
    const history = useHistory()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    const auth = useRecoilValue(authAtom)
    const eventAction = useEventAction()
    const [events, setEvents] = useState([])
    const showSnackbar = useSnackbar()

    const eventStartTime = (timeStamp) => {
        return (
            new Date(timeStamp).toLocaleString('en-US', { dateStyle: 'full' }) +
            ' - ' +
            new Date(timeStamp).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
        )
    }

    useEffect(() => {
        let filterString = '?'
        filterString += 'search=' + nameFilter

        eventAction
            .getEvents(filterString)
            .then((res) => setEvents(res.data.data.listEvents))
            .catch(() =>
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameFilter])

    return (
        <Box display="flex" flexDirection="column">
            {events.length ? (
                <Grid container rowGap={3} display="flex" justifyContent="center">
                    {events.map(({ id, eventTitle, eventDescription, startDate, imageUrl }) => (
                        <Card
                            key={id}
                            elevation={3}
                            sx={{
                                position: 'relative',
                                width: '100%',
                            }}
                        >
                            <Box px={{ xs: 2, sm: 4 }} mb={{ xs: 8, md: 4, lg: 0 }}>
                                <Grid item xs={12} container>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <EventPoster src={imageUrl} size="contain" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={8}>
                                        <EventSummaryInfo
                                            title={eventTitle}
                                            content={eventDescription}
                                            startTime={startDate}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                position="absolute"
                                bottom={30}
                                right={matches ? 50 : 10}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography color="secondary" variant="body1" my={1}>
                                    {eventStartTime(startDate)}
                                </Typography>
                                <Box display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => history.push(`/events/register/${id}`)}
                                        sx={{ mx: 1 }}
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        onClick={() => history.push(`/events/${id}`)}
                                        sx={{ mx: 1 }}
                                    >
                                        Read More
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Grid>
            ) : (
                <Box display="flex" justifyContent="center" mt={8}>
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        {auth.role === 'Organizer' ? (
                            <React.Fragment>
                                There is not any events here, let&apos;s{' '}
                                <RouterLink to="/events/create">
                                    <Link component="span">create one!</Link>
                                </RouterLink>{' '}
                            </React.Fragment>
                        ) : (
                            'There is not any events here, please come back later!'
                        )}
                    </Alert>
                </Box>
            )}

            <Box display="flex" justifyContent="center" my={6}>
                <Button variant="contained" size="large" onClick={() => history.push('/events')}>
                    Load More
                </Button>
            </Box>
        </Box>
    )
}

export default EventsList
