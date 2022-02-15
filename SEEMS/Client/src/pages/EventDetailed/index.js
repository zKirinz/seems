import React from 'react'

import EventPoster from '../../components/EventPoster'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Link,
    OutlinedInput,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'
const EventDetailed = () => {
    return (
        <Container fixed maxWidth="sm" sx={{ mt: 15, px: 0 }}>
            <Card>
                <EventPoster src={src} size="cover" />
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
                        faucibus pulvinar. Suscipit tellus mauris a diam maecenas sed enim ut. Odio
                        ut sem nulla pharetra diam
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Typography sx={{ mt: 1 }} variant="h6" fontWeight={500} color="secondary">
                            Free
                        </Typography>
                        <Button variant="contained">Subscribe</Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                            }}
                        >
                            <Typography variant="h5">Start date</Typography>
                            <Typography>16 Feb 2022</Typography>
                            <Typography>Wednesday</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                            }}
                        >
                            <Typography variant="h5">End date</Typography>
                            <Typography>16 Feb 2022</Typography>
                            <Typography>Wednesday</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Link
                            underline="hover"
                            sx={{ color: grey[600], display: 'block' }}
                            align="right"
                            href="#"
                        >
                            54 comments
                        </Link>
                    </Box>
                    <Box component="form">
                        <FormControl fullWidth>
                            <OutlinedInput
                                placeholder="Write your comment..."
                                size="small"
                                sx={{
                                    borderRadius: 8,
                                    '&.Mui-focused': {
                                        borderColor: 'green',
                                    },
                                }}
                            />
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
export default EventDetailed
