import { Box, Avatar, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'

const CurrentEvent = ({ currentEvents }) => {
    return (
        <Box sx={{ px: 5, mt: 2 }}>
            {currentEvents.map((currentEvent) => (
                <Grid container mt={4} key={currentEvent.id}>
                    <Grid item sm={12} xs={12} md={4}>
                        <Box sx={{ backgroundColor: 'secondary.light', pt: 3 }}>
                            <Typography
                                align="center"
                                sx={{
                                    fontWeight: (theme) => theme.typography.fontWeightBold,
                                }}
                                color="primary.contrastText"
                                variant="h5"
                            >
                                {currentEvent.time}
                            </Typography>
                            <Typography
                                align="center"
                                color="primary.contrastText"
                                fontWeight={(theme) => theme.typography.fontWeightMedium}
                            >
                                Room No - <strong>{currentEvent.roomNum}</strong>
                            </Typography>
                            <Box display="flex" alignItems="center">
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
                                        fontWeight={(theme) => theme.typography.fontWeightMedium}
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
                                    component="h5"
                                    color="secondary"
                                    mt={3}
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
    )
}

export default CurrentEvent
