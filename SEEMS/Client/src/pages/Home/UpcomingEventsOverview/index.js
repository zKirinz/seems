import React from 'react'

import { useHistory } from 'react-router-dom'

import EventPoster from '../../../components/EventPoster'
import { Grid, Card, Typography, Box, Button } from '@mui/material'

import EventSummaryInfo from './EventSummaryInfo'

const UpcomingEventsOverview = ({ upComingEvents }) => {
    const history = useHistory()

    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mb={6} mt={2} fontWeight={700}>
                Upcoming Events
            </Typography>
            <Grid container rowGap={6}>
                {upComingEvents.map(({ id, title, content, time, src }) => (
                    <Card key={id} elevation={3} sx={{ mx: 6 }}>
                        <Box px={{ xs: 2, sm: 5 }}>
                            <Grid item xs={12} container>
                                <Grid item xs={12} sm={6} md={3}>
                                    <EventPoster src={src} size="contain" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={9}>
                                    <EventSummaryInfo title={title} content={content} time={time} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                ))}
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
