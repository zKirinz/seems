import { Box, Typography } from '@mui/material'

const Introduction = ({ src, size, desc, title }) => {
    return (
        <Box
            sx={{
                marginTop: (theme) => theme.spacing(10),
                height: '400px',
                backgroundImage: `url(${src})`,
                width: '100%',
                backgroundPosition: 'center',
                backgroundSize: size,
                backgroundRepeat: 'no-repeat',
            }}
            position="relative"
        >
            <Box
                sx={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,.7)',
                    zIndex: 1,
                }}
                position="absolute"
            ></Box>
            <Box
                position="absolute"
                sx={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 3,
                    py: 5,
                    px: 10,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: { xs: '64px', md: '90px' },
                            fontWeight: '900',
                            letterSpacing: (theme) => theme.spacing(2),
                            mt: { xs: '24px' },
                        }}
                        color="secondary"
                    >
                        {title}
                    </Typography>
                    <Typography
                        paragraph
                        color="secondary"
                        sx={{
                            fontSize: { xs: '16px', sm: '24px' },
                            maxWidth: '800px',
                            mt: (theme) => theme.spacing(3),
                        }}
                        align="center"
                    >
                        {desc}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Introduction
