import React from 'react'

import { useHistory } from 'react-router-dom'

import EventPoster from '../../../components/EventPoster'
import SearchField from '../../../components/SearchField'
import { Grid, Card, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material'

import EventSummaryInfo from './EventSummaryInfo'

const UpComingEvents = ({ upComingEvents }) => {
    const history = useHistory()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <React.Fragment>
            <Typography variant="h3" color="primary" align="center" mt={2} fontWeight={700}>
                Upcoming Events
            </Typography>
            <Box mx={{ sx: 2, md: 10 }} my={5}>
                <SearchField />
            </Box>
            <Grid container rowGap={6}>
                {upComingEvents.map(({ id, title, content, time, src }) => (
                    <Card
                        key={id}
                        elevation={3}
                        sx={{ position: 'relative', mx: { sx: 2, md: 10 } }}
                    >
                        <Box px={{ xs: 2, sm: 5 }} mb={{ xs: 8, md: 4, lg: 0 }}>
                            <Grid item xs={12} container>
                                <Grid item xs={12} sm={6} md={3}>
                                    <EventPoster src={src} size="contain" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={9}>
                                    <EventSummaryInfo title={title} content={content} time={time} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            position="absolute"
                            bottom={30}
                            right={matches ? 50 : 10}
                            display="flex"
                            justifyContent="center"
                        >
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
                    </Card>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={6}>
                <Button variant="contained" size="large" onClick={() => history.push('/events')}>
                    See All Events
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default UpComingEvents
