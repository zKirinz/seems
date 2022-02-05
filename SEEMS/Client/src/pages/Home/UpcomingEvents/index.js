import React from 'react'

import { Grid, Card, Typography } from '@mui/material'

import LeftDetail from './LeftDetail'
import RightDetail from './RightDetail'

const CurrentEvent = ({ currentEvents }) => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mb={2} mt={3} fontWeight={700}>
                Upcoming events
            </Typography>
            <Grid container rowGap={5}>
                {currentEvents.map((currentEvent) => (
                    <Grid item xs={12} container key={currentEvent.id} component={Card}>
                        <Grid item sm={12} xs={12} md={4}>
                            <LeftDetail src={currentEvent.banner} />
                        </Grid>
                        <Grid item sm={12} xs={12} md={8}>
                            <RightDetail
                                title={currentEvent.title}
                                content={currentEvent.content}
                                time={currentEvent.time}
                                mode={currentEvent.mode}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default CurrentEvent
