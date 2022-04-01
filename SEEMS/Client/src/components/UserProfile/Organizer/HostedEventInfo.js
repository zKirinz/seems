import React from 'react'

import { useHistory } from 'react-router-dom'

import { AddTask, Event, EventAvailable, EventSeat, Groups, RateReview } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

const HostedEventInfo = ({
    totalHostedEvent,
    totalHostedFeedbackEvent,
    totalFinishedEvent,
    totalParticipant,
    totalReservation,
    onClose,
    isAdmin,
}) => {
    const history = useHistory()

    return (
        <React.Fragment>
            {totalHostedEvent === 0 && !isAdmin && (
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
                                history.push('/events/create')
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
                                <RateReview fontSize="large" sx={{ color: '#4dd0e1' }} />
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
                                <EventAvailable fontSize="large" sx={{ color: '#32cb00' }} />
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
    )
}

export default HostedEventInfo
