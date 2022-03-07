import React, { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import EventPoster from '../../components/EventPoster'
import { Festival } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import atom from '../../recoil/auth'
import useEventAction from '../../recoil/event/action'
import CheckAttendanceButton from './CheckAttendanceButton'
import CommentsSection from './Comments/index'
import EditEventButton from './EditEventButton'
import EventDate from './EventDate'

const EventDetailed = () => {
    const auth = useRecoilValue(atom)
    const history = useHistory()
    const { id } = useParams()
    const { getDetailedEvent, checkIsMyEvent } = useEventAction()
    const [error, setError] = useState(null)
    const [isMyEvent, setIsMyEvent] = useState(true)
    const showSnackbar = useSnackbar()

    const [detailedEvent, setDetailedEvent] = useState({
        numberComments: 0,
        event: {},
        numberRootComments: 0,
    })
    useEffect(() => {
        getDetailedEvent(id)
            .then((response) => {
                const { event: responseEvent } = response.data.data
                setDetailedEvent({
                    numberComments: responseEvent.commentsNum,
                    event: responseEvent,
                    numberRootComments: responseEvent.rootCommentsNum,
                })
            })
            .catch((errorResponse) => {
                const errorMessage = errorResponse.response.data.data
                setError(errorMessage)
            })

        if (auth.role !== 'User') {
            checkIsMyEvent(id)
                .then((response) => {
                    const isMine = response.data.data.isMine
                    setIsMyEvent(isMine)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                })
        }
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
                <Grid item xs={12} sm={8} component={Card} sx={{ position: 'relative' }}>
                    <CardContent sx={{ p: 5 }}>
                        <Typography variant="h4" color="primary" fontWeight={700}>
                            {detailedEvent.event.eventTitle}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ my: 0.5 }}>
                            <Festival color="primary" fontSize="medium" />
                            <Typography
                                fontWeight={500}
                                variant="h6"
                                sx={{ ml: 1.5, color: blueGrey[900] }}
                            >
                                {detailedEvent.event.location}
                            </Typography>
                        </Box>
                        <EventDate
                            startDate={new Date(detailedEvent.event.startDate)}
                            endDate={new Date(detailedEvent.event.endDate)}
                        />
                        <Typography
                            paragraph
                            sx={{ color: blueGrey[900], mt: 1.5 }}
                            variant="subtitle1"
                        >
                            {detailedEvent.event.eventDescription}
                        </Typography>
                    </CardContent>
                    {isMyEvent && (
                        <React.Fragment>
                            <EditEventButton />
                            <CheckAttendanceButton
                                onClickHandler={() =>
                                    history.push(`/admin/events/me/${id}/attendance`)
                                }
                            />
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
            <CommentsSection
                eventId={id}
                numberComments={detailedEvent.numberComments}
                numberRootComments={detailedEvent.numberRootComments}
            />
        </Container>
    )
}
export default EventDetailed
