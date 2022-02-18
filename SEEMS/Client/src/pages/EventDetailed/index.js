import EventPoster from '../../components/EventPoster'
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import CommentsSection from './Comments'
import EventDate from './EventDate'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const EventDetailed = () => {
    return (
        <Container fixed sx={{ mt: 15, px: 0 }}>
            <Grid component={Card} container>
                <Grid item xs={12} sm={4}>
                    <EventPoster src={src} size="contain" />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h4" color="primary" fontWeight={700}>
                            Header
                        </Typography>
                        <Typography fontWeight={500} sx={{ color: grey[600], mt: 1 }} variant="h6">
                            Location
                        </Typography>
                        <Typography paragraph sx={{ color: grey[600], my: 1 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut
                            faucibus pulvinar. Suscipit tellus mauris a diam maecenas sed enim ut.
                            Odio ut sem nulla pharetra diam.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2,
                            }}
                        >
                            <Typography
                                sx={{ mt: 1 }}
                                variant="h6"
                                fontWeight={500}
                                color="secondary"
                            >
                                Free
                            </Typography>
                            <Button variant="contained">Subscribe</Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
                            <EventDate
                                nameDate="Start"
                                dateTime="16 Feb 2022"
                                dateInWeek="Wednesday"
                            />
                            <EventDate
                                nameDate="End"
                                dateTime="16 Feb 2022"
                                dateInWeek="Wednesday"
                            />
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: grey[600], display: 'block', mb: 2 }} align="right">
                    54 comments
                </Typography>
            </Box>
            <CommentsSection />
        </Container>
    )
}
export default EventDetailed
