import { Box, Rating, Typography } from '@mui/material'

const FeedbackItem = ({ rating, content, createAt }) => {
    console.log(createAt)
    return (
        <Box sx={{ my: 2 }}>
            <Rating value={rating} readOnly />
            <Typography sx={{ ml: 0.5 }}>{content}</Typography>
        </Box>
    )
}

export default FeedbackItem
