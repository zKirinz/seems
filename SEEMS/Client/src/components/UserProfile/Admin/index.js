import React, { useEffect, useState } from 'react'

import {
    AddTask,
    Event,
    EventAvailable,
    EventSeat,
    Groups,
    HighlightOff,
    RateReview,
} from '@mui/icons-material'
import {
    Avatar,
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useUsersAction from '../../../recoil/user/action'

const Admin = ({ userEmail, onClose, open }) => {
    const showSnackbar = useSnackbar()
    const { getUserEventStatistic } = useUsersAction()
    const [isLoading, setIsLoading] = useState(false)
    const [userProfile, setUserProfile] = useState({})
    const [totalHostedEvent, setTotalHostedEvent] = useState(0)
    const [totalHostedFeedbackEvent, setTotalHostedFeedbackEvent] = useState(0)
    const [totalFinishedEvent, setTotalFinishedEvent] = useState(0)
    const [totalParticipant, setTotalParticipant] = useState(0)
    const [totalReservation, setTotalReservation] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        getUserEventStatistic(userEmail)
            .then((response) => {
                const user = response.data.data.userInfo
                const hostedEvents = user.hostedEventsNum
                const totalHostedFinishedEvent = user.hostedFinishedEventsNum
                const totalHostedReservationEvent = user.totalReceivedReservationsNum
                const totalHostedParticipantEvent = user.totalAttendedOnReceivedReservationsNum
                const totalHostedFeedbackEvent = user.totalReceivedFeedbacks

                setUserProfile(user)
                setTotalHostedEvent(hostedEvents)
                setTotalHostedFeedbackEvent(totalHostedFeedbackEvent)
                setTotalFinishedEvent(totalHostedFinishedEvent)
                setTotalParticipant(totalHostedParticipantEvent)
                setTotalReservation(totalHostedReservationEvent)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Dialog onBackdropClick={onClose} open={open}>
            <Box sx={{ position: 'absolute', right: 10 }}>
                <IconButton onClick={onClose} size="large">
                    <HighlightOff fontSize="large" />
                </IconButton>
            </Box>
            <DialogTitle color="primary.dark">My Profile</DialogTitle>
            <DialogContent sx={{ minWidth: 550, maxWidth: 650, py: 3 }} dividers>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress disableShrink />
                    </Box>
                ) : (
                    <React.Fragment>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ mb: 6 }}
                            justifyContent="center"
                        >
                            <Avatar
                                alt="avatar"
                                src={userProfile.imageURL}
                                sx={{ height: 100, width: 100 }}
                            />
                            <Box sx={{ ml: 4 }}>
                                <Typography
                                    fontWeight={700}
                                    sx={{ color: blueGrey[800] }}
                                    variant="h6"
                                >
                                    {userProfile.username} - {userProfile.organizationName}
                                </Typography>
                                <Typography variant="subtitle1">{userProfile.email}</Typography>
                            </Box>
                        </Box>
                        {totalHostedEvent === 0 && (
                            <Box
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <AddTask fontSize="large" color="info" />
                                <Typography sx={{ ml: 0.75 }}>
                                    You haven&apos;t
                                    <Typography
                                        sx={{
                                            fontStyle: 'italic',
                                            fontWeight: 700,
                                            mx: 0.6,
                                            color: blueGrey[600],
                                        }}
                                        component="span"
                                    >
                                        Registered
                                    </Typography>
                                    any event yet. Let&apos;s create{' '}
                                    <Typography
                                        color="primary"
                                        variant="h6"
                                        onClick={() => {
                                            history.push('/admin/events/create')
                                            onClose()
                                        }}
                                        sx={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                        }}
                                        component="span"
                                    >
                                        one
                                    </Typography>
                                </Typography>
                            </Box>
                        )}
                        {totalHostedEvent !== 0 && (
                            <Box sx={{ mt: 5 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #e91e63', p: 2 }}
                                        >
                                            <Event fontSize="large" color="secondary" />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalHostedEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Total hosted event
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #4dd0e1', p: 2 }}
                                        >
                                            <RateReview
                                                fontSize="large"
                                                sx={{ color: '#4dd0e1' }}
                                            />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalHostedFeedbackEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Feedbacks of hosted events
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #32cb00', p: 2 }}
                                        >
                                            <EventAvailable
                                                fontSize="large"
                                                sx={{ color: '#32cb00' }}
                                            />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalFinishedEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Hosted events finished
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #69f0ae', p: 2 }}
                                        >
                                            <Groups fontSize="large" sx={{ color: '#69f0ae' }} />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalParticipant}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Participants has engaged in events
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #536dfe', p: 2 }}
                                        >
                                            <EventSeat fontSize="large" sx={{ color: '#536dfe' }} />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalReservation}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Reservations of hosted events
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Admin
