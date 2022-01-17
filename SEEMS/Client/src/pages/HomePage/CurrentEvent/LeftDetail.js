import TimeText from '../../../components/TimeText'
import { Box, Avatar, Typography } from '@mui/material'

const LeftDetail = ({ speaker, major, roomNum, time }) => {
    return (
        <Box sx={{ backgroundColor: 'secondary.light', pt: 3 }}>
            <TimeText
                color="primary.contrastText"
                variant="h5"
                time={time}
                stroke={false}
                component="h1"
            />
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
                    sx={{
                        width: '171px',
                        height: '168px',
                        overflow: 'unset',
                    }}
                ></Avatar>
                <Box ml={3}>
                    <Typography
                        mb={1}
                        color="primary.contrastText"
                        fontWeight={(theme) => theme.typography.fontWeightBold}
                        sx={{ fontSize: { sm: 12, md: 14, lg: 18 } }}
                    >
                        {speaker}
                    </Typography>
                    <Typography
                        color="primary.contrastText"
                        fontWeight={(theme) => theme.typography.fontWeightMedium}
                        letterSpacing={1}
                        variant="h6"
                        fontSize={{
                            xs: 12,
                            sm: 14,
                            lg: 16,
                        }}
                    >
                        {major}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default LeftDetail
