import { useRecoilValue } from 'recoil'

import { Typography, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'

import atom from '../../../recoil/auth'

const EventSummaryInfo = ({ title, content }) => {
    const auth = useRecoilValue(atom)
    return (
        <CardContent sx={{ px: 8, py: 4 }}>
            <Typography
                fontWeight={700}
                color="primary"
                variant="h5"
                sx={{
                    width: `${auth.email ? '75%' : '100%'}`,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '2',
                    textOverflow: 'ellipsis',
                }}
            >
                {title}
            </Typography>
            <Typography
                component="p"
                mt={1.5}
                sx={{
                    color: grey[500],
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '2',
                    textOverflow: 'ellipsis',
                }}
                fontWeight={500}
                variant="subtitle2"
            >
                {content}
            </Typography>
        </CardContent>
    )
}

export default EventSummaryInfo
