import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import EventPoster from '../../components/EventPoster'
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

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
        <Container fixed sx={{ mt: 15, px: 0 }}>
            <Grid component={Card} container>
                <Grid item xs={12} sm={4}>
                    <EventPoster src={detailedEvent.event.imageUrl} size="contain" />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" color="primary" fontWeight={700}>
                            {detailedEvent.event.eventTitle}
                        </Typography>
                        <Typography fontWeight={500} sx={{ color: grey[600], mt: 1 }} variant="h6">
                            {detailedEvent.event.location}
                        </Typography>
                        <Typography paragraph sx={{ color: grey[600], my: 1 }}>
                            {detailedEvent.event.eventDescription}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained">Subscribe</Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
                            <EventDate
                                date={new Date(detailedEvent.event.startDate)}
                                nameDate="Start"
                            />
                            <EventDate
                                nameDate="End"
                                date={new Date(detailedEvent.event.endDate)}
                            />
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: grey[600], display: 'block', mb: 2 }} align="right">
                    {detailedEvent.numberComments} comments
                </Typography>
            </Box>
            <CommentsSection eventId={id} />
        </Container>
    )
}
export default EventDetailed
