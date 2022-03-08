import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import EventPoster from '../../components/EventPoster'
import { Festival, Note, SupervisedUserCircle } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import atom from '../../recoil/auth'
import useEventAction from '../../recoil/event/action'
import CheckAttendanceButton from './CheckAttendanceButton'
import CommentsSection from './Comments/index'
import EditEventButton from './EditEventButton'
import EventDate from './EventDate'
import RegisterButton from './RegisterButton'
import UnRegisterButton from './UnRegisterButton'

const EventDetailed = () => {
    const auth = useRecoilValue(atom)
    const history = useHistory()
    const { id } = useParams()
    const { getDetailedEvent, checkIsMyEvent } = useEventAction()
    const [isMyEvent, setIsMyEvent] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [reset, setReset] = useState(0)
    const showSnackbar = useSnackbar()
    const [detailedEvent, setDetailedEvent] = useState({
        numberComments: 0,
        event: {},
        numberRootComments: 0,
    })
    useEffect(() => {
        getDetailedEvent(id)
            .then((response) => {
                console.log(response)
                const { event: responseEvent, registered } = response.data.data
                setDetailedEvent({
                    numberComments: responseEvent.commentsNum,
                    event: responseEvent,
                    numberRootComments: responseEvent.rootCommentsNum,
                })
                setIsRegistered(registered)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
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
                        <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                            <SupervisedUserCircle color="primary" />
                            <Typography
                                color="secondary"
                                fontWeight={700}
                                variant="h6"
                                sx={{ ml: 1 }}
                            >
                                {detailedEvent.event.organizationName}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                            <Festival color="primary" fontSize="medium" />
                            <Typography
                                fontWeight={500}
                                variant="h6"
                                sx={{ ml: 1, color: blueGrey[900] }}
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
                    {auth.role === 'User' && isRegistered && (
                        <UnRegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'User' && !isRegistered && (
                        <RegisterButton
                            eventId={id}
                            resetHandler={() => setReset(reset + 1)}
                            canRegister={detailedEvent.event.canRegister}
                        />
                    )}
                    {auth.role === 'Organizer' && !isMyEvent && isRegistered && (
                        <UnRegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'Organizer' && !isMyEvent && !isRegistered && (
                        <RegisterButton
                            eventId={id}
                            resetHandler={() => setReset(reset + 1)}
                            canRegister={detailedEvent.event.canRegister}
                        />
                    )}
                    {auth.role === 'Organizer' && isMyEvent && (
                        <React.Fragment>
                            <EditEventButton />
                            <CheckAttendanceButton
                                onClickHandler={() => history.push(`/events/me/${id}/attendance`)}
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
                        <Note color="primary" />{' '}
                        <Typography sx={{ mx: 0.5 }}>Note: Register before</Typography>
                        <Typography sx={{ color: blueGrey[900] }} variant="body1" fontWeight={500}>
                            {moment(new Date(detailedEvent.event.registrationDeadline)).format(
                                'MMM Do YYYY, HH:mm A'
                            )}
                        </Typography>
                    </Box>
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
