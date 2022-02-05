import React from 'react'

import { Grid, Card, Typography } from '@mui/material'

import EventPoster from './EventPoster'
import RightDetail from './RightDetail'

const UpComingEvents = ({ upComingEvents }) => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mb={2} mt={3} fontWeight={700}>
                Upcoming events
            </Typography>
            <Grid container rowGap={5}>
                {upComingEvents.map((upComingEvent) => (
                    <Grid
                        item
                        xs={12}
                        container
                        key={upComingEvent.id}
                        component={Card}
                        elevation={2}
                    >
                        <Grid item sm={12} xs={12} md={4}>
                            <EventPoster src={upComingEvent.banner} />
                        </Grid>
                        <Grid item sm={12} xs={12} md={8}>
                            <RightDetail
                                title={upComingEvent.title}
                                content={upComingEvent.content}
                                time={upComingEvent.time}
                                mode={upComingEvent.mode}
                                eventId={upComingEvent.id}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default UpComingEvents
