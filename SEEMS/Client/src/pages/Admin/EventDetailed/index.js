import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { useHistory, useParams } from 'react-router-dom'

import EventPoster from '../../../components/EventPoster'
import {
    GroupsOutlined,
    Home,
    NoteAlt,
    RateReview,
    SupervisedUserCircle,
} from '@mui/icons-material'
import { Box, Card, CardContent, Container, Fab, Grid, Tooltip, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'
import CheckAttendanceButton from './CheckAttendanceButton'
import CommentsSection from './Comments/index'
import EditEventButton from './EditEventButton'
import EventDate from './EventDate'

const EventDetailed = () => {
    const history = useHistory()
    const { id } = useParams()
    const { getDetailedEvent, checkIsMyEvent } = useEventAction()
    const [error, setError] = useState(null)
    const [isMyEvent, setIsMyEvent] = useState(false)
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
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 1.5 }}
                        >
                            <Typography variant="h4" color="primary" fontWeight={700}>
                                {detailedEvent.event.eventTitle}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <GroupsOutlined fontSize="medium" sx={{ mr: 1 }} />
                                <Typography>{detailedEvent.event.registeredNum} / </Typography>
                                <Typography>{detailedEvent.event.participantNum}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                            <Box display="flex" alignItems="center">
                                <Home color="primary" fontSize="medium" />
                                <Typography
                                    fontWeight={500}
                                    variant="h6"
                                    sx={{ ml: 1, color: blueGrey[900] }}
                                >
                                    {detailedEvent.event.location}
                                </Typography>
                            </Box>
                            <Typography sx={{ mx: 2 }} variant="h6">
                                -
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <SupervisedUserCircle color="primary" />
                                <Typography
                                    color="secondary"
                                    fontWeight={500}
                                    variant="h6"
                                    sx={{ ml: 1, color: blueGrey[900] }}
                                >
                                    {detailedEvent.event.organizationName}
                                </Typography>
                            </Box>
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
                    <Box sx={{ mt: 4 }}>
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
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 30,
                                left: 40,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <NoteAlt color="primary" />
                            <Typography sx={{ mx: 0.5 }}>Registrations close on</Typography>
                            <Typography
                                sx={{ color: blueGrey[900] }}
                                variant="body1"
                                fontWeight={500}
                            >
                                {moment(new Date(detailedEvent.event.registrationDeadline)).format(
                                    'MMM Do YYYY, HH:mm A'
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <CommentsSection
                eventId={id}
                numberComments={detailedEvent.numberComments}
                numberRootComments={detailedEvent.numberRootComments}
            />
            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 100, right: 40 }}
                variant="extended"
            >
                <Tooltip title="Feedback" sx={{ mr: 1 }}>
                    <RateReview />
                </Tooltip>
                Feedback
            </Fab>
        </Container>
    )
}
export default EventDetailed
