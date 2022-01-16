import { Box } from '@mui/material'

const ImageItem = ({ src, size }) => {
    return (
        <Box
            width="100%"
            height="100vh"
            sx={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: size,
                backgroundPosition: 'center',
            }}
        />
    )
}

export default ImageItem
