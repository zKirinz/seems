import { Box } from '@mui/material'

const EventPoster = ({ src }) => {
    return (
        <Box
            sx={{
                height: '300px',
                backgroundImage: `url(${src})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        ></Box>
    )
}

export default EventPoster
