import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Introduction = ({ src, desc, title, alt }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <Box position="relative">
            <Avatar sx={{ height: '400px', width: '100%' }} src={src} variant="square" alt={alt} />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.6)',
                    p: 5,
                }}
            >
                <Typography
                    sx={{ letterSpacing: 2, my: 2 }}
                    variant={`${matchs ? 'h1' : 'h2'}`}
                    color="secondary"
                    fontWeight={900}
                    align="center"
                >
                    {title}
                </Typography>
                <Typography
                    paragraph
                    color="secondary"
                    variant={`${matchs ? 'h5' : 'subtitle1'}`}
                    align="center"
                    sx={{ maxWidth: 1000, m: '0 auto' }}
                >
                    {desc}
                </Typography>
            </Box>
        </Box>
    )
}

export default Introduction
