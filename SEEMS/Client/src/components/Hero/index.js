import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import HeroImage from '../../assets/images/hero.jpg'

const Hero = () => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <Box position="relative">
            <Avatar
                sx={{ height: '360px', width: '100%' }}
                src={HeroImage}
                variant="square"
                alt="hero-image"
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    px: 5,
                    pb: 5,
                    pt: 7,
                }}
            >
                <Typography
                    sx={{ letterSpacing: 2, my: 2 }}
                    variant={`${matchs ? 'h1' : 'h2'}`}
                    color="secondary"
                    fontWeight={900}
                    align="center"
                >
                    SEEMS
                </Typography>
                <Typography
                    paragraph
                    color="secondary"
                    variant={`${matchs ? 'h5' : 'subtitle1'}`}
                    align="center"
                    sx={{ maxWidth: 1000, m: '0 auto' }}
                >
                    Where FPT students will have the opportunity to enhance technical skills as well
                    as soft skill through many software academic events and activities related to
                    modern technologies.
                </Typography>
            </Box>
        </Box>
    )
}

export default Hero
