import { Typography, useMediaQuery, Box, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'

const RightDetail = ({ title, content, topics }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <CardContent>
            <Typography
                fontWeight={700}
                color="primary.dark"
                variant={`${matchs ? 'h5' : 'subtitle1'}`}
            >
                {title}
            </Typography>
            <Typography component="p" mt={2} sx={{ color: grey[500] }} fontWeight={500}>
                {content}
            </Typography>
            <Typography mt={1} color="secondary" fontWeight={700}>
                Topic
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    mt: 1,
                }}
            >
                {topics.map((topic) => (
                    <Typography
                        key={topic.id}
                        variant={`${matchs ? 'body1' : 'body2'}`}
                        sx={{ color: grey[800] }}
                    >
                        {topic.title}
                    </Typography>
                ))}
            </Box>
        </CardContent>
    )
}

export default RightDetail
