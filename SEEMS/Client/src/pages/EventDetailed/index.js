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
import RegisterButton from './RegisterButton'
import UnRegisterButton from './UnRegisterButton'

const EventDetailed = () => {
    const auth = useRecoilValue(atom)
    const history = useHistory()
    const { id } = useParams()
    const { getDetailedEvent, checkIsMyEvent } = useEventAction()
    const [error, setError] = useState(null)
    const [isMyEvent, setIsMyEvent] = useState(true)
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
                const { event: responseEvent, registered } = response.data.data
                setDetailedEvent({
                    numberComments: responseEvent.commentsNum,
                    event: responseEvent,
                    numberRootComments: responseEvent.rootCommentsNum,
                })
                setIsRegistered(registered)
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
    }, [reset])

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
                    {auth.role === 'User' && isRegistered && (
                        <UnRegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'User' && !isRegistered && (
                        <RegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'Organizer' && !isMyEvent && isRegistered && (
                        <UnRegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'Organizer' && !isMyEvent && !isRegistered && (
                        <RegisterButton eventId={id} resetHandler={() => setReset(reset + 1)} />
                    )}
                    {auth.role === 'Organizer' && isMyEvent && (
                        <React.Fragment>
                            <EditEventButton />
                            <CheckAttendanceButton
                                onClickHandler={() => history.push(`/events/me/${id}/attendance`)}
                            />
                        </React.Fragment>
                    )}
                    {auth.role === 'Admin' && (
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
