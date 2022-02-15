import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
    Login as LoginIcon,
    Logout as LogoutIcon,
    Add as AddIcon,
    Notifications as NotificationsIcon,
    Event as EventIcon,
} from '@mui/icons-material'
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Badge,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import authAtom, { useAuthAction } from '../../../recoil/auth'
import userAtom, { useUserAction } from '../../../recoil/user'

const RightNavBar = () => {
    const auth = useRecoilValue(authAtom)
    const [user, setUser] = useRecoilState(userAtom)
    const history = useHistory()
    const authAction = useAuthAction()
    const userAction = useUserAction()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsLoading] = useState()
    const open = Boolean(anchorEl)
    const showSnackbar = useSnackbar()

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

    useEffect(() => {
        if (auth.email) {
            setIsLoading(true)
            userAction
                .getProfile()
                .then((response) => {
                    if (response?.data?.status === 'success') {
                        setUser({
                            email: response.data.data.email,
                            username: response.data.data.userName,
                            image: response.data.data.imageUrl,
                            role: auth.role,
                        })
                    }
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Cannot get user profile.',
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.email])

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {auth.email ? (
                    <React.Fragment>
                        <Tooltip title="Notification">
                            <IconButton size="large" sx={{ mr: 1 }}>
                                <Badge badgeContent={3} color="info">
                                    <NotificationsIcon
                                        fontSize="large"
                                        sx={{ color: (theme) => theme.palette.grey[100] }}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Account settings">
                            <IconButton onClick={handleClick} size="large">
                                <Avatar sx={{ width: 40, height: 40 }}>H</Avatar>
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
                                    mt: 1.5,
                                    pt: 3,
                                    px: 3,
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
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Box
                                    component="li"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    mb={2}
                                >
                                    <Avatar
                                        alt="avatar"
                                        src={user.image}
                                        sx={{ width: 80, height: 80, mb: 2 }}
                                    />
                                    <Typography variant="body1" fontWeight={700} textAlign="center">
                                        {user.username}
                                    </Typography>
                                    <Typography variant="body1" textAlign="center">
                                        {user.email}
                                    </Typography>
                                    <Typography variant="body1" textAlign="center">
                                        Role - {user.role}
                                    </Typography>
                                </Box>
                            )}
                            {auth.role === 'Organizer' && (
                                <Box>
                                    <MenuItem
                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                        onClick={() => history.push('/events/me')}
                                    >
                                        <ListItemIcon>
                                            <EventIcon fontSize="large" />
                                        </ListItemIcon>
                                        <Typography ml={1}>My events</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                        onClick={() => history.push('/events/create')}
                                    >
                                        <ListItemIcon>
                                            <AddIcon fontSize="large" />
                                        </ListItemIcon>
                                        <Typography ml={1}>Create event</Typography>
                                    </MenuItem>
                                </Box>
                            )}
                            <MenuItem
                                sx={{ display: 'flex', justifyContent: 'center' }}
                                onClick={handleClickLogout}
                            >
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
        </React.Fragment>
    )
}

export default RightNavBar
