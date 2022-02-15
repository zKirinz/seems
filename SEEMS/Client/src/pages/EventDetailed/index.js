import React, { useEffect, useState, useRef } from 'react'

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

import { useCommentsAction } from '../../recoil/comments'
import Loading from '../Loading/'
import EventDate from './EventDate'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const EventDetailed = () => {
    const commentsActions = useCommentsAction()
    const commentContent = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const loadCommentsHandler = () => {
        setIsLoading(true)
        commentsActions.loadComments().then((response) => {
            setComments(response.data.data)
            setIsLoading(false)
        })
    }

    const createCommentHandler = (event) => {
        if (commentContent.current.value.trim().length !== 0 && event.key === 'Enter') {
            setIsLoading(true)
            const commentData = {
                UserId: 1,
                EventId: 1,
                CommentContent: commentContent.current.value,
                parentCommentId: null,
            }
            commentsActions.createComment(commentData).then((response) => {
                const newComment = response.data.data
                setComments((previousComments) => [newComment, ...previousComments])
            })
            commentContent.current.value = ''
            setIsLoading(false)
        }
    }

    const deleteCommentHandler = (commentId) => {
        commentsActions.deleteComment(commentId).then(() => {
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
            )
        })
    }
    useEffect(() => {
        loadCommentsHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                    onKeyDown={createCommentHandler}
                />
            </FormControl>
            <Comments comments={comments} onDeleteComment={deleteCommentHandler} />
        </Container>
    )
}
export default EventDetailed
