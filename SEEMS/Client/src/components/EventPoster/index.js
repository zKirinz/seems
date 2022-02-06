import { Box } from '@mui/material'

const EventPoster = ({ poster }) => {
    const { src, height, size } = poster

    return (
        <Box
            sx={{
                height: height,
                backgroundImage: `url(${src})`,
                backgroundSize: size,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        ></Box>
    )
}

export default EventPoster
