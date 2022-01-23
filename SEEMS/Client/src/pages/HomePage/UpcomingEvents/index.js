import React from 'react'

import { Grid, Typography, Card } from '@mui/material'

import TitleHomePage from '../TitleHomePage'
import LeftDetail from './LeftDetail'
import RightDetail from './RightDetail'

const CurrentEvent = ({ currentEvents }) => {
    return (
        <React.Fragment>
            <TitleHomePage title="Upcoming events" variant="h4" color="primary" align="center" />
            <Typography variant="h3" color="secondary" align="center" fontWeight={500} mb={1}>
                16/01/2022
            </Typography>
            <Grid container rowGap={5}>
                {currentEvents.map((currentEvent) => (
                    <Grid item xs={12} container key={currentEvent.id} component={Card}>
                        <Grid item sm={12} xs={12} md={4}>
                            <LeftDetail {...currentEvent} />
                        </Grid>
                        <Grid item sm={12} xs={12} md={8}>
                            <RightDetail
                                title={currentEvent.title}
                                content={currentEvent.content}
                                topics={currentEvent.topics}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default CurrentEvent
