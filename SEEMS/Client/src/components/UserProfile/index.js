import { useRecoilValue } from 'recoil'

import { Avatar, Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import atom from '../../recoil/auth'

const UserProfile = ({ onClose, open }) => {
    const auth = useRecoilValue(atom)

    return (
        <Dialog onBackdropClick={onClose} open={open}>
            <DialogTitle color="primary.dark">My Profile</DialogTitle>
            <DialogContent sx={{ minWidth: 450, py: 3 }} dividers>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Avatar alt="avatar" src={auth.image} sx={{ height: 100, width: 100 }} />
                    <Typography fontWeight={700} sx={{ mt: 2, color: blueGrey[800] }} variant="h6">
                        {auth.name} - {auth.organization}
                    </Typography>
                    <Typography variant="subtitle1">{auth.email}</Typography>
                </Box>
                {/* <Box sx={{ mt: 2 }}> // Adding content here </Box> */}
            </DialogContent>
        </Dialog>
    )
}

export default UserProfile
