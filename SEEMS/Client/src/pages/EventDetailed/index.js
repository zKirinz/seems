import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import EventPoster from '../../components/EventPoster'
import { Festival } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'

import useEventAction from '../../recoil/event/action'
import CommentsSection from './Comments/index'
import EventDate from './EventDate'

const EventDetailed = () => {
    const { id } = useParams()
    const { getDetailedEvent } = useEventAction()
    const [error, setError] = useState(null)
    const [detailedEvent, setDetailedEvent] = useState({
        numberComments: 0,
        event: {},
    })
    useEffect(() => {
        getDetailedEvent(id)
            .then((response) => {
                const { event: responseEvent, commentCount } = response.data.data
                setDetailedEvent({
                    numberComments: commentCount,
                    event: responseEvent,
                })
            })
            .catch((errorResponse) => {
                const errorMessage = errorResponse.response.data.data
                setError(errorMessage)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (error)
        return (
            <Box
                sx={{
                    height: '85vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">{error}</Typography>
            </Box>
        )
    return (
        <Container fixed sx={{ mt: 15, px: 0, mb: 8 }}>
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <EventPoster src={detailedEvent.event.imageUrl} size="contain" />
                </Grid>
                <Grid item xs={12} sm={8} component={Card}>
                    <CardContent sx={{ p: 5 }}>
                        <Typography variant="h4" color="primary" fontWeight={700}>
                            {detailedEvent.event.eventTitle}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ my: 2 }}>
                            <Festival color="primary" fontSize="medium" />
                            <Typography
                                fontWeight={600}
                                variant="h5"
                                sx={{ ml: 1.5, color: blueGrey[900] }}
                            >
                                {detailedEvent.event.location}
                            </Typography>
                        </Box>
                        <EventDate
                            startDate={new Date(detailedEvent.event.startDate)}
                            endDate={new Date(detailedEvent.event.endDate)}
                        />
                        <Typography paragraph sx={{ color: blueGrey[900], my: 1.5 }} variant="h6">
                            {detailedEvent.event.eventDescription}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: grey[600], display: 'block', mb: 2 }} align="right">
                    {detailedEvent.numberComments} comments
                </Typography>
            </Box>
            <CommentsSection eventId={id} numberComments={detailedEvent.numberComments} />
        </Container>
    )
}
export default EventDetailed
