import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import {
    Login as LoginIcon,
    Logout as LogoutIcon,
    Add as AddIcon,
    Event as EventIcon,
    AppRegistration as AppRegistrationIcon,
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
    Button,
    Divider,
    Chip,
} from '@mui/material'

import authAtom, { useAuthAction } from '../../../recoil/auth'
import UserProfile from '../../UserProfile'

const RightNavBar = () => {
    const auth = useRecoilValue(authAtom)
    const history = useHistory()
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
    const handleClickLogin = () => {
        history.push('/login')
    }
    const handleClickLogout = () => {
        authAction.logout()
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {auth.email ? (
                    <React.Fragment>
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
                                    px: 3,
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
                                    <Chip
                                        label={
                                            auth.role !== 'User'
                                                ? `${auth.role} - ${auth.organization}`
                                                : `${auth.role}`
                                        }
                                    />
                                </Divider>
                            </Box>

                            {auth.role === 'Organizer' && (
                                <MenuItem
                                    sx={{ display: 'flex', px: 5 }}
                                    onClick={() => history.push('/events/me')}
                                >
                                    <ListItemIcon>
                                        <EventIcon fontSize="large" />
                                    </ListItemIcon>
                                    <Typography ml={1}>My Events</Typography>
                                </MenuItem>
                            )}

                            <MenuItem
                                sx={{ display: 'flex', px: 5 }}
                                onClick={() => history.push('/events/my-registrations')}
                            >
                                <ListItemIcon>
                                    <AppRegistrationIcon fontSize="large" />
                                </ListItemIcon>
                                <Typography ml={1}>My Registrations</Typography>
                            </MenuItem>

                            {auth.role === 'Organizer' && (
                                <MenuItem
                                    sx={{ display: 'flex', px: 5 }}
                                    onClick={() => history.push('/events/create')}
                                >
                                    <ListItemIcon>
                                        <AddIcon fontSize="large" />
                                    </ListItemIcon>
                                    <Typography ml={1}>Create Event</Typography>
                                </MenuItem>
                            )}

                            <MenuItem sx={{ display: 'flex', px: 5 }} onClick={handleOpenDialog}>
                                <ListItemIcon>
                                    <AccountCircle fontSize="large" />
                                </ListItemIcon>
                                <Typography ml={1}>My Account</Typography>
                            </MenuItem>

                            <MenuItem sx={{ display: 'flex', px: 5 }} onClick={handleClickLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="large" />
                                </ListItemIcon>
                                <Typography ml={1}>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{ fontSize: '1.1rem', color: (theme) => theme.palette.grey[100] }}
                        startIcon={
                            <LoginIcon
                                sx={{
                                    fontSize: '1.6rem!important',
                                    color: (theme) => theme.palette.grey[100],
                                }}
                            />
                        }
                        onClick={handleClickLogin}
                    >
                        Login
                    </Button>
                )}
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
