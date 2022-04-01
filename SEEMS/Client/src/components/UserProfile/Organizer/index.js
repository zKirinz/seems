import React, { useEffect, useState } from 'react'

import { HighlightOff } from '@mui/icons-material'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    CircularProgress,
    IconButton,
    Typography,
    Avatar,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useUsersAction from '../../../recoil/user/action'
import HostedEventInfo from './HostedEventInfo'
import RegisteredEventInfo from './RegisteredEventInfo'

const Organizer = ({ userEmail, onClose, open, isAdmin }) => {
    const showSnackbar = useSnackbar()
    const { getUserEventStatistic } = useUsersAction()
    const [userProfile, setUserProfile] = useState({})
    const [userEventStatistic, setUserEventStatistic] = useState({})
    const [totalRegisteredEvent, setTotalRegisteredEvent] = useState(0)
    const [totalFeedbackAnEvent, setTotalFeedbackAnEvent] = useState(0)
    const [totalNoFeedbackAnEvent, setTotalNoFeedbackAnEvent] = useState(0)
    const [totalAbsence, setTotalAbsence] = useState(0)
    const [totalRegisteredPendingEventsNum, setRegisteredPendingEventsNum] = useState(0)
    const [consecutiveAbsenceCount, setConsecutiveAbsenceCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [totalHostedEvent, setTotalHostedEvent] = useState(0)
    const [totalHostedFeedbackEvent, setTotalHostedFeedbackEvent] = useState(0)
    const [totalFinishedEvent, setTotalFinishedEvent] = useState(0)
    const [totalParticipant, setTotalParticipant] = useState(0)
    const [totalReservation, setTotalReservation] = useState(0)

    const registeredEventOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (TooltipItem) {
                        const formatTotalRegisteredEvent =
                            totalRegisteredEvent === 0 ? 1 : totalRegisteredEvent
                        return `${(
                            (TooltipItem.formattedValue * 100) /
                            formatTotalRegisteredEvent
                        ).toFixed(2)}%`
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                boxWidth: 0,
                boxHeight: 0,
                xAlign: 'right',
                yAlign: 'right',
            },
        },
    }

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

                const userStatistic = {
                    labels: [
                        'Participation with feedback',
                        'Participation without feedback',
                        'No participation',
                        'Pending event',
                    ],
                    datasets: [
                        {
                            label: 'Event statistic',
                            data: response.data.data.userEventInfo,
                            backgroundColor: ['#2e7d32', '#0288d1', '#d32f2f', '#ffc115'],
                            borderColor: [
                                'rgba(96, 255, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 233, 42, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }

                setUserProfile(user)
                setUserEventStatistic(userStatistic)
                setTotalRegisteredEvent(user.registeredEventsNum)
                setTotalFeedbackAnEvent(user.feedbackedEventsNum)
                setTotalNoFeedbackAnEvent(user.noFeedbackEventsNum)
                setTotalAbsence(user.absentEventsNum)
                setConsecutiveAbsenceCount(user.consecutiveAbsentEventsNum)
                setRegisteredPendingEventsNum(user.registeredPendingEventsNum)
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
                        <RegisteredEventInfo
                            totalRegisteredEvent={totalRegisteredEvent}
                            onClose={onClose}
                            consecutiveAbsenceCount={consecutiveAbsenceCount}
                            totalFeedbackAnEvent={totalFeedbackAnEvent}
                            totalNoFeedbackAnEvent={totalNoFeedbackAnEvent}
                            totalAbsence={totalAbsence}
                            totalRegisteredPendingEventsNum={totalRegisteredPendingEventsNum}
                            options={registeredEventOptions}
                            userEventStatistic={userEventStatistic}
                            isAdmin={isAdmin}
                        />
                        <HostedEventInfo
                            totalHostedEvent={totalHostedEvent}
                            totalHostedFeedbackEvent={totalHostedFeedbackEvent}
                            totalFinishedEvent={totalFinishedEvent}
                            totalParticipant={totalParticipant}
                            totalReservation={totalReservation}
                            onClose={onClose}
                            isAdmin={isAdmin}
                        />
                    </React.Fragment>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Organizer
