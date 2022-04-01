import React from 'react'

import { useHistory } from 'react-router-dom'

import {
    CommentsDisabled,
    Event,
    MarkChatRead,
    Pending,
    SentimentSatisfiedAlt,
    ThumbUp,
    WebAssetOff,
} from '@mui/icons-material'
import { Alert, Box, Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
const RegisteredEventInfo = ({
    totalRegisteredEvent,
    onClose,
    consecutiveAbsenceCount,
    totalFeedbackAnEvent,
    totalNoFeedbackAnEvent,
    totalAbsence,
    totalRegisteredPendingEventsNum,
    options,
    userEventStatistic,
    isAdmin,
}) => {
    const history = useHistory()

    return (
        <React.Fragment>
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
                                consecutiveAbsenceCount === 1 ? 'once' : 'consecutively twice'
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
                                <MarkChatRead fontSize="large" color="success" />
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
                                sx={{ border: '1px solid #ffc115', p: 2 }}
                            >
                                <Pending fontSize="large" sx={{ color: '#ffc115' }} />
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
    )
}

export default RegisteredEventInfo
