import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
    Event,
    Comment,
    CommentsDisabled,
    WebAssetOff,
    SentimentSatisfiedAlt,
    ThumbUp,
    Pending,
    HighlightOff,
} from '@mui/icons-material'
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Grid,
    Alert,
    CircularProgress,
    IconButton,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useUsersAction from '../../../recoil/user/action'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const User = ({ userEmail, onClose, open, isAdmin }) => {
    const history = useHistory()
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
    const showSnackbar = useSnackbar()

    const options = {
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
                const statistic = {
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
                            backgroundColor: ['#2e7d32', '#0288d1', '#d32f2f', '#ffeb3b'],
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
                setUserEventStatistic(statistic)
                setTotalRegisteredEvent(user.registeredEventsNum)
                setTotalFeedbackAnEvent(user.feedbackedEventsNum)
                setTotalNoFeedbackAnEvent(user.noFeedbackEventsNum)
                setTotalAbsence(user.absentEventsNum)
                setConsecutiveAbsenceCount(user.consecutiveAbsentEventsNum)
                setRegisteredPendingEventsNum(user.registeredPendingEventsNum)
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
                        {totalRegisteredEvent !== 0 && (
                            <Box>
                                {consecutiveAbsenceCount === 0 && (
                                    <Alert
                                        severity="success"
                                        variant="outlined"
                                        sx={{ textAlign: 'center', justifyContent: 'center' }}
                                        icon={<ThumbUp />}
                                    >
                                        You are doing well! Keep it up!
                                    </Alert>
                                )}
                                {consecutiveAbsenceCount !== 0 && (
                                    <Alert
                                        severity="warning"
                                        variant="outlined"
                                        sx={{
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {`You've absented ${
                                            consecutiveAbsenceCount === 1
                                                ? 'once'
                                                : 'consecutively twice'
                                        }. Your account will be banned if
                                reaching three times and you have to contact IT department to get
                                unbanned.`}
                                    </Alert>
                                )}
                            </Box>
                        )}
                        {totalRegisteredEvent === 0 && !isAdmin && (
                            <Box
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <SentimentSatisfiedAlt fontSize="large" color="info" />
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
                                    any event yet. Let&apos;s find{' '}
                                    <Typography
                                        color="primary"
                                        variant="h6"
                                        onClick={() => {
                                            history.push('/events')
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
                        {totalRegisteredEvent !== 0 && (
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #ff5722', p: 2 }}
                                        >
                                            <Event fontSize="large" color="primary" />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalRegisteredEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Total Registration
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #2e7d32', p: 2 }}
                                        >
                                            <Comment fontSize="large" color="success" />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalFeedbackAnEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Participation with feedback
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #0288d1', p: 2 }}
                                        >
                                            <CommentsDisabled fontSize="large" color="info" />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalNoFeedbackAnEvent}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Participation without feedback
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #d32f2f', p: 2 }}
                                        >
                                            <WebAssetOff fontSize="large" color="error" />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalAbsence}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Registration without attendance
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flexDirection="column"
                                            sx={{ border: '1px solid #ffeb3b', p: 2 }}
                                        >
                                            <Pending fontSize="large" sx={{ color: '#ffeb3b' }} />
                                            <Typography
                                                fontWeight={700}
                                                variant="h5"
                                                sx={{ my: 1, color: blueGrey[800] }}
                                            >
                                                {totalRegisteredPendingEventsNum}
                                            </Typography>
                                            <Typography variant="body2" align="center">
                                                Pending events
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box sx={{ width: 400, mx: 'auto', mt: 5 }}>
                                    <Pie data={userEventStatistic} options={options} />
                                </Box>
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default User
