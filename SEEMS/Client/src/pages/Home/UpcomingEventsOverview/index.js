import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import EventPoster from '../../../components/EventPoster'
import { Grid, Card, Typography, Box, Button } from '@mui/material'

import useEventAction from '../../../recoil/event/action'
import EventSummaryInfo from './EventSummaryInfo'

const UpcomingEventsOverview = () => {
    const history = useHistory()
    const eventAction = useEventAction()
    const [upcomingEventsOverview, setUpcomingEventsOverview] = useState([])

    useEffect(() => {
        eventAction.getUpcomingEvents().then((res) => {
            setUpcomingEventsOverview(res.data.data.events)
            // console.log(res.data.data.events)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mb={6} mt={2} fontWeight={700}>
                Upcoming Events
            </Typography>
            <Grid container rowGap={6} display="flex" justifyContent="center">
                {upcomingEventsOverview.map(
                    ({ id, eventTitle, eventDescription, startDate, imageUrl }) => (
                        <Card key={id} elevation={3} sx={{ mx: 6, maxWidth: 1000, width: '100%' }}>
                            <Box px={{ xs: 2, sm: 5 }}>
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
                        </Card>
                    )
                )}
            </Grid>
            <Box display="flex" justifyContent="center" mt={6}>
                <Button variant="contained" size="large" onClick={() => history.push('/login')}>
                    Login for more events and detail
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default UpcomingEventsOverview
