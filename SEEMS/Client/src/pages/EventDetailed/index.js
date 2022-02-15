import React, { useRef, useState } from 'react'

import Comments from '../../components/Comments'
import EventPoster from '../../components/EventPoster'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    FormControl,
    Grid,
    Link,
    OutlinedInput,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import DGP from '../../assets/members/DGP.jpg'
import { post } from '../../utils/ApiCaller'
import Loading from '../Loading/'
import EventDate from './EventDate'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const comments = [
    {
        id: 1,
        username: 'Dương Gia Phát',
        userAvatar: DGP,
        alt: 'user avatar',
        content: `Đợt xưa năm mình thi Đại học. Ở Hải Phòng có vụ 1 bạn gái xuống thi vào ĐH Y
        HP bị xe ôm lừa chở vào động cave. Bạn này đi từ tỉnh khác xuống bến xe thì
        tính đi xe ôm về chỗ anh trai`,
    },
    {
        id: 2,
        username: 'Dương gia phát',
        userAvatar: DGP,
        alt: 'user avatar',
        content: `Đợt xưa năm mình thi Đại học. Ở Hải Phòng có vụ 1 bạn gái xuống thi vào ĐH Y
        HP bị xe ôm lừa chở vào động cave. Bạn này đi từ tỉnh khác xuống bến xe thì
        tính đi xe ôm về chỗ anh trai`,
    },
]

const EventDetailed = () => {
    const commentContent = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [commentss, setCommentss] = useState([])
    const [commentsLoaded, setCommentsLoaded] = useState({
        lastCommentId: null,
        numberComments: 5,
    })
    const moreCommentsHandler = async (event) => {
        try {
            setIsLoading(true)
            const response = await post({
                endpoint: '/api/comments',
                body: {
                    lastCommentId: commentsLoading.lastCommentId,
                    numberComments: commentsLoading.numberComments,
                },
            })
            console.log(response)
        } catch (error) {
            console.log(error.response)
            setError(error.response)
        }
    }
    if (isLoading) return <Loading />
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
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
                <Link
                    underline="hover"
                    sx={{ color: grey[600], display: 'block', mb: 2 }}
                    align="right"
                    href="#"
                >
                    54 comments
                </Link>
            </Box>
            <FormControl fullWidth>
                <OutlinedInput
                    placeholder="Write your comment..."
                    size="small"
                    sx={{
                        borderRadius: 8,
                    }}
                    inputRef={commentContent}
                />
            </FormControl>
            <Comments comments={comments} />
            <Typography
                sx={{ mt: 2, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={moreCommentsHandler}
            >
                Watch more comments
            </Typography>
        </Container>
    )
}
export default EventDetailed
