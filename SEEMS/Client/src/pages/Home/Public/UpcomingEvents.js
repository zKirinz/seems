import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import EventCard from '../../../components/EventsListWithFilter/EventCard'
import { EventBusy as EventBusyIcon } from '@mui/icons-material'
import { Grid, Typography, Box, Button, Alert, CircularProgress } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const UpcomingEvents = () => {
    const history = useHistory()
    const eventAction = useEventAction()
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const showSnackbar = useSnackbar()

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
            <Typography variant="h3" color="primary" align="center" mb={6} mt={2} fontWeight={700}>
                Upcoming Events
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" my={20}>
                    <CircularProgress thickness={4} color="secondary" />
                </Box>
            ) : upcomingEvents.length ? (
                <Grid container rowGap={6} display="flex" justifyContent="center">
                    {upcomingEvents.map(
                        ({
                            id,
                            canRegister,
                            eventTitle,
                            eventDescription,
                            startDate,
                            imageUrl,
                            organizationName,
                        }) => (
                            <EventCard
                                key={id}
                                id={id}
                                canRegister={canRegister}
                                title={eventTitle}
                                description={eventDescription}
                                startDate={startDate}
                                imageUrl={imageUrl}
                                organizer={organizationName}
                            />
                        )
                    )}
                </Grid>
            ) : (
                <Box display="flex" justifyContent="center" mt={8}>
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        There is not any upcoming events here, please come back later!
                    </Alert>
                </Box>
            )}
            <Box display="flex" justifyContent="center" mt={6}>
                <Button variant="contained" size="large" onClick={() => history.push('/login')}>
                    Login for more events and detail
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default UpcomingEvents
