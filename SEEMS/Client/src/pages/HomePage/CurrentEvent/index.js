import React from 'react'

import TimeText from '../../../components/TimeText'
import { Box, Grid, Paper } from '@mui/material'

import TitleHomePage from '../TitleHomePage'
import LeftDetail from './LeftDetail'
import RightDetail from './RightDetail'

const CurrentEvent = ({ currentEvents }) => {
    return (
        <React.Fragment>
            <TitleHomePage title="Event" variant="h4" color="secondary" align="center" />
            <TimeText variant="h3" color="#ce1446" time="16/01/2022" component="h1" stroke={true} />
            <Box>
                {currentEvents.map((currentEvent) => (
                    <Grid
                        container
                        mt={4}
                        key={currentEvent.id}
                        component={Paper}
                        elevation={2}
                        overflow="hidden"
                    >
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
            </Box>
        </React.Fragment>
    )
}

export default CurrentEvent
