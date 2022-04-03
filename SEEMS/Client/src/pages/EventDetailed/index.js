import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import EventPoster from '../../components/EventPoster'
import {
    GroupsOutlined,
    Home,
    NoteAlt,
    SupervisedUserCircle,
    AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material'
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import atom from '../../recoil/auth'
import useEventAction from '../../recoil/event/action'
import Loading from '../Loading'
import CheckAttendanceButton from './CheckAttendanceButton'
import CommentsSection from './Comments/index'
import EditEventButton from './EditEventButton'
import EventDate from './EventDate'
import FeedBack from './FeedBack'
import RegisterButton from './RegisterButton'

const EventDetailed = () => {
    const auth = useRecoilValue(atom)
    const showSnackbar = useSnackbar()
    const history = useHistory()
    const { id } = useParams()
    const { getDetailedEvent, checkIsMyEvent, isUpdateEventAvailable } = useEventAction()
    const [isMyEvent, setIsMyEvent] = useState(false)
    const [error, setError] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [reset, setReset] = useState(0)
    const [editEventAvailable, setEditEventAvailable] = useState(false)
    const [isEventEnd, setIsEventEnd] = useState(false)
    const [detailedEvent, setDetailedEvent] = useState({
        numberComments: 0,
        event: {},
        numberRootComments: 0,
    })
    const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {
        getDetailedEvent(id)
            .then((response) => {
                const { event: responseEvent, registered } = response.data.data
                const isEventOver =
                    new Date().getTime() - new Date(responseEvent.endDate).getTime() > 0

                setIsEventEnd(isEventOver)
                setDetailedEvent({
                    numberComments: responseEvent.commentsNum,
                    event: responseEvent,
                    numberRootComments: responseEvent.rootCommentsNum,
                })
                setIsRegistered(registered)
                isUpdateEventAvailable(id).then((res) => {
                    const isUpdatable = res.data.data.isUpdatable
                    setEditEventAvailable(isUpdatable)
                })

                setTimeout(() => {
                    setIsFirstRender(false)
                }, 500)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setError(true)
                setTimeout(() => {
                    setIsFirstRender(false)
                }, 500)
            })

        if (auth.role === 'Organizer') {
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
    }, [reset])

    if (error)
        return isFirstRender ? (
            <Loading />
        ) : (
            <Box
                sx={{
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" fontWeight={700} sx={{ color: grey[800] }}>
                    Something went wrong, does not find the event.
                </Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => history.goBack()}>
                    Go back
                </Button>
            </Box>
        )

    return isFirstRender ? (
        <Loading />
    ) : (
        <Container fixed sx={{ mt: 20, px: 0, mb: 12.5 }}>
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
                            <Typography
                                variant="h4"
                                color="primary"
                                fontWeight={700}
                                sx={{ width: '85%' }}
                            >
                                {detailedEvent.event.eventTitle}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <GroupsOutlined fontSize="medium" sx={{ mr: 1 }} />
                                <Typography>{detailedEvent.event.registeredNum}</Typography>
                                {detailedEvent.event.participantNum !== 0 && (
                                    <Typography>/ {detailedEvent.event.participantNum}</Typography>
                                )}
                            </Box>
                        </Box>
                        <Box display="flex" sx={{ my: 1 }}>
                            <Box display="flex">
                                <Home color="primary" sx={{ fontSize: 30 }} />
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
                            <Box display="flex">
                                <SupervisedUserCircle color="primary" sx={{ fontSize: 30 }} />
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
                    <Box sx={{ mt: 6 }}>
                        {auth.role === 'User' && isRegistered && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 30,
                                    right: 30,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<AppRegistrationIcon />}
                                    disabled
                                >
                                    Registered
                                </Button>
                            </Box>
                        )}
                        {auth.role === 'User' && !isRegistered && (
                            <RegisterButton
                                eventId={id}
                                resetHandler={() => setReset(reset + 1)}
                                canRegister={detailedEvent.event.canRegister}
                                registrationDeadline={detailedEvent.event.registrationDeadline}
                            />
                        )}
                        {auth.role === 'Organizer' && !isMyEvent && isRegistered && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 30,
                                    right: 30,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<AppRegistrationIcon />}
                                    disabled
                                >
                                    Registered
                                </Button>
                            </Box>
                        )}
                        {auth.role === 'Organizer' && !isMyEvent && !isRegistered && (
                            <RegisterButton
                                eventId={id}
                                resetHandler={() => setReset(reset + 1)}
                                canRegister={detailedEvent.event.canRegister}
                                registrationDeadline={detailedEvent.event.registrationDeadline}
                            />
                        )}
                        {auth.role === 'Organizer' && isMyEvent && (
                            <React.Fragment>
                                <EditEventButton isEditable={editEventAvailable} />
                                <CheckAttendanceButton
                                    eventId={id}
                                    onClickHandler={() =>
                                        history.push(`/events/me/${id}/attendance`)
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
            {isEventEnd && <FeedBack eventId={id} isMyEvent={isMyEvent} />}
        </Container>
    )
}
export default EventDetailed
