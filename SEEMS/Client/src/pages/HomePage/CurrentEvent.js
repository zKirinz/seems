import React from 'react'

import TimeText from '../../components/TimeText/Index'
import { Box, Avatar, Card, CardContent, Grid, IconButton, Typography, Paper } from '@mui/material'

import TitleHomePage from './TitleHomePage'

const CurrentEvent = ({ currentEvents }) => {
    return (
        <React.Fragment>
            <TitleHomePage title="Event" variant="h4" color="secondary" align="center" />
            <TimeText variant="h3" color="#ce1446" time="16/01/2022" component="h1" stroke={true} />
            <Box>
                {currentEvents.map((currentEvent) => (
                    <Grid
                        container
                        mt={4}
                        key={currentEvent.id}
                        component={Paper}
                        elevation={2}
                        overflow="hidden"
                    >
                        <Grid item sm={12} xs={12} md={4}>
                            <Box sx={{ backgroundColor: 'secondary.light', pt: 3 }}>
                                <TimeText
                                    color="primary.contrastText"
                                    variant="h5"
                                    time={currentEvent.time}
                                    stroke={false}
                                    component="h1"
                                />
                                <Typography
                                    align="center"
                                    color="primary.contrastText"
                                    fontWeight={(theme) => theme.typography.fontWeightMedium}
                                >
                                    Room No - <strong>{currentEvent.roomNum}</strong>
                                </Typography>
                                <Box display="flex" alignItems="center" mt={2}>
                                    <Avatar
                                        src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/speaker/speaker-sm2.png"
                                        alt="person"
                                        sx={{
                                            width: '171px',
                                            height: '168px',
                                            overflow: 'unset',
                                        }}
                                    ></Avatar>
                                    <Box ml={3}>
                                        <Typography
                                            mb={1}
                                            color="primary.contrastText"
                                            fontWeight={(theme) => theme.typography.fontWeightBold}
                                            sx={{ fontSize: { sm: 12, md: 14, lg: 18 } }}
                                        >
                                            {currentEvent.speaker}
                                        </Typography>
                                        <Typography
                                            color="primary.contrastText"
                                            fontWeight={(theme) =>
                                                theme.typography.fontWeightMedium
                                            }
                                            letterSpacing={1}
                                            variant="h6"
                                            fontSize={{
                                                xs: 12,
                                                sm: 14,
                                                lg: 16,
                                            }}
                                        >
                                            {currentEvent.major}
                                        </Typography>
                                        <IconButton></IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12} md={8}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography
                                        component="h1"
                                        fontWeight={700}
                                        color="secondary"
                                        sx={{ fontSize: { md: 20, lg: 24, sm: 18 } }}
                                    >
                                        {currentEvent.title}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        mt={2}
                                        sx={{ color: '#515154' }}
                                        fontWeight={500}
                                    >
                                        {currentEvent.content}
                                    </Typography>
                                    <Typography
                                        mt={1}
                                        component="h5"
                                        color="secondary"
                                        fontWeight={700}
                                        sx={{ textDecoration: 'underline' }}
                                    >
                                        Topic
                                    </Typography>
                                    <Grid mt={2} container>
                                        {currentEvent.topics.map((topic) => (
                                            <Grid key={topic.id} xs={12} sm={4} item>
                                                <Typography
                                                    fontSize={{
                                                        xs: 14,
                                                        sm: 18,
                                                    }}
                                                    sx={{
                                                        color: (theme) => theme.palette.grey[800],
                                                        textAlign: { xs: 'left', sm: 'center' },
                                                    }}
                                                >
                                                    {topic.title}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </React.Fragment>
    )
}

export default CurrentEvent
