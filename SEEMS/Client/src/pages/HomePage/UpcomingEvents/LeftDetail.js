import { Box, Avatar, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const LeftDetail = ({ speaker, major, roomNum, time }) => {
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <Box sx={{ backgroundColor: 'primary.light', pt: 3 }}>
            <Typography color="primary.contrastText" variant="h5" align="center">
                {time}
            </Typography>
            <Typography
                align="center"
                color="primary.contrastText"
                fontWeight={(theme) => theme.typography.fontWeightMedium}
            >
                Room No - <strong>{roomNum}</strong>
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
                <Avatar
                    src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/speaker/speaker-sm2.png"
                    alt="person"
                    sx={{ width: '100%', maxWidth: '171px', height: '168px', overflow: 'unset' }}
                ></Avatar>
                <Box ml={2}>
                    <Typography
                        mb={1}
                        color="primary.contrastText"
                        fontWeight={(theme) => theme.typography.fontWeightBold}
                        variant={`${matchs ? 'h5' : 'body2'}`}
                    >
                        {speaker}
                    </Typography>
                    <Typography
                        color="primary.contrastText"
                        fontWeight={(theme) => theme.typography.fontWeightMedium}
                        variant={`${matchs ? 'h6' : 'body1'}`}
                    >
                        {major}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default LeftDetail
