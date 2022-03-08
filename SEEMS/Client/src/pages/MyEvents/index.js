import { useRecoilValue } from 'recoil'

import EventsListWithFilter from '../../components/EventsListWithFilter'
import pageEnum from '../../components/EventsListWithFilter/pageEnum'
import { Box, Typography } from '@mui/material'

import authAtom from '../../recoil/auth'

const MyEvents = () => {
    const auth = useRecoilValue(authAtom)

    return (
        <Box component="main" minHeight="65vh" mt={8.5} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                {auth.organization} Events
            </Typography>
            <EventsListWithFilter page={pageEnum.MyEvents} />
        </Box>
    )
}

export default MyEvents
