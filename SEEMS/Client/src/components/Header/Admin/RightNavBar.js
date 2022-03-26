import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import {
    Logout as LogoutIcon,
    Add as AddIcon,
    Event as EventIcon,
    AccountCircle,
} from '@mui/icons-material'
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
    Divider,
    Chip,
} from '@mui/material'

import authAtom, { useAuthAction } from '../../../recoil/auth'
import UserProfile from '../../UserProfile'

const RightNavBar = () => {
    const history = useHistory()
    const auth = useRecoilValue(authAtom)
    const authAction = useAuthAction()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClickLogout = () => {
        authAction.logout()
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="large">
                        <Avatar src={auth.image} sx={{ width: 40, height: 40 }} />
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1,
                            px: 5,
                            pt: 3,
                            pb: 1,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box
                        component="li"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={1}
                    >
                        <Avatar
                            alt="avatar"
                            src={auth.image}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="body1" fontWeight={700} textAlign="center">
                            {auth.name}
                        </Typography>
                        <Typography variant="body1" textAlign="center">
                            {auth.email}
                        </Typography>
                        <Divider textAlign="center" sx={{ width: '100%', mt: 2 }}>
                            <Chip label={`${auth.role} - ${auth.organization}`} />
                        </Divider>
                    </Box>

                    <Box>
                        <MenuItem
                            sx={{ display: 'flex', px: 5 }}
                            onClick={() => history.push('/admin/events/me')}
                        >
                            <ListItemIcon>
                                <EventIcon fontSize="large" />
                            </ListItemIcon>
                            <Typography ml={1}>My events</Typography>
                        </MenuItem>
                        <MenuItem
                            sx={{ display: 'flex', px: 5 }}
                            onClick={() => history.push('/admin/events/create')}
                        >
                            <ListItemIcon>
                                <AddIcon fontSize="large" />
                            </ListItemIcon>
                            <Typography ml={1}>Create event</Typography>
                        </MenuItem>
                        <MenuItem sx={{ display: 'flex', px: 5 }} onClick={handleOpenDialog}>
                            <ListItemIcon>
                                <AccountCircle fontSize="large" />
                            </ListItemIcon>
                            <Typography ml={1}>My Account</Typography>
                        </MenuItem>
                    </Box>

                    <MenuItem sx={{ display: 'flex', px: 5 }} onClick={handleClickLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="large" />
                        </ListItemIcon>
                        <Typography ml={1}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            {openDialog && (
                <UserProfile
                    open={openDialog}
                    onClose={handleCloseDialog}
                    userEmail={auth.email}
                    role={auth.role}
                />
            )}
        </React.Fragment>
    )
}

export default RightNavBar
