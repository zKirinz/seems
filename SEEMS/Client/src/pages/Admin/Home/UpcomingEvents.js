import React, { useEffect, useState } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import EventCard from '../../../components/EventsListWithFilter/EventCard'
import SearchField from '../../../components/SearchField'
import { EventBusy as EventBusyIcon } from '@mui/icons-material'
import { Grid, Typography, Box, Button, Alert, Link, CircularProgress } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import authAtom from '../../../recoil/auth'
import useEventAction from '../../../recoil/event/action'

const UpComingEvents = () => {
    const history = useHistory()
    const auth = useRecoilValue(authAtom)
    const eventAction = useEventAction()
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const showSnackbar = useSnackbar()

    const searchFilterSubmitHandler = (searchText) => {
        searchText = searchText.trim()
        if (searchText !== '') {
            history.push('/admin/events?search=' + searchText + '&upcoming=true')
        }
    }

    useEffect(() => {
        eventAction
            .getUpcomingEvents()
            .then((res) => {
                setUpcomingEvents(res.data.data.events)
                setIsLoading(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mt={2} fontWeight={700}>
                Upcoming Events
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" my={20}>
                    <CircularProgress thickness={4} color="secondary" />
                </Box>
            ) : upcomingEvents.length ? (
                <Box sx={{ maxWidth: 1000, m: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    <Box my={5}>
                        <SearchField submitHandler={searchFilterSubmitHandler} />
                    </Box>
                    <Grid container rowGap={6}>
                        {upcomingEvents.map(
                            ({
                                id,
                                eventTitle,
                                eventDescription,
                                startDate,
                                imageUrl,
                                organizationName,
                            }) => (
                                <Grid item xs={12} key={id}>
                                    <EventCard
                                        id={id}
                                        title={eventTitle}
                                        description={eventDescription}
                                        startDate={startDate}
                                        imageUrl={imageUrl}
                                        organizer={organizationName}
                                        isAdmin
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" mt={8}>
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        {auth.role === 'Organizer' ? (
                            <React.Fragment>
                                There is not any upcoming events here, let&apos;s{' '}
                                <RouterLink to="/events/create">
                                    <Link component="span">create one!</Link>
                                </RouterLink>{' '}
                            </React.Fragment>
                        ) : (
                            'There is not any upcoming events here, please come back later!'
                        )}
                    </Alert>
                </Box>
            )}

            <Box display="flex" justifyContent="center" mt={6}>
                <Button variant="contained" size="large" onClick={() => history.push('/events')}>
                    See All Events
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default UpComingEvents
