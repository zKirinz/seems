import { Box, Typography } from '@mui/material'

const fullScreenAbsolute = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
}

const Introduction = ({ src, size, desc, title }) => {
    return (
        <Box
            sx={{
                marginTop: (theme) => theme.spacing(10),
                height: '400px',
                backgroundImage: `url(${src})`,
                backgroundPosition: 'center',
                backgroundSize: size,
                backgroundRepeat: 'no-repeat',
            }}
            position="relative"
        >
            <Box
                sx={{
                    ...fullScreenAbsolute,
                    backgroundColor: 'rgba(0,0,0,.7)',
                    zIndex: 1,
                }}
            ></Box>
            <Box
                sx={{
                    ...fullScreenAbsolute,
                    zIndex: 2,
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
                            letterSpacing: (theme) => theme.spacing(2),
                            mt: (theme) => theme.spacing(2),
                        }}
                        fontSize={{
                            lg: 90,
                            md: 70,
                            sm: 50,
                            xs: 40,
                        }}
                        color="primary"
                        fontWeight={900}
                    >
                        {title}
                    </Typography>
                    <Typography
                        paragraph
                        color="secondary"
                        sx={{
                            maxWidth: '800px',
                            mt: (theme) => theme.spacing(3),
                        }}
                        fontSize={{
                            sm: 24,
                            xs: 16,
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
