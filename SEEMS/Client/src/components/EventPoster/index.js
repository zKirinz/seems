import { Box } from '@mui/material'

const EventPoster = ({ src, height, size }) => {
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
