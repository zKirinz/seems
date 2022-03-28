import React, { useState } from 'react'

import UserProfile from '../../../components/UserProfile'
import { Edit as EditIcon, Save as SaveIcon, Person as PersonIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Select, Avatar, Button, FormControl, MenuItem, TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useUsersAction } from '../../../recoil/user'

const UserTableRow = ({
    id,
    userName,
    imageUrl,
    email,
    role,
    organization,
    active,
    resetHandler,
}) => {
    const userAction = useUsersAction()
    const [isEdit, setIsEdit] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editedRole, setEditedRole] = useState(role)
    const [editedOrganization, setEditedOrganization] = useState(organization)
    const [editedActive, setEditedActive] = useState(active ? 'Active' : 'Inactive')
    const showSnackbar = useSnackbar()

    const onChangeEditRole = (roleTarget) => {
        if (roleTarget === 'Organizer') {
            setEditedOrganization('FCode')
        } else if (roleTarget === 'User') {
            setEditedOrganization('None')
        }
        setEditedRole(roleTarget)
    }

    const saveEditHandler = async () => {
        setIsLoading(true)
        try {
            await userAction.updateUserRole({
                id,
                role: editedRole,
            })

            await userAction.updateUserOrganizationActive({
                id,
                Organization: editedOrganization !== 'None' ? editedOrganization : 'FPTer',
                active: editedActive === 'Active' ? true : false,
            })

            showSnackbar({
                severity: 'success',
                children: `Update user ${email} attendance successfully.`,
            })
            resetHandler()
        } catch {
            showSnackbar({
                severity: 'error',
                children: 'Something went wrong, please try again later.',
            })
        }

        setIsLoading(false)
        setIsEdit(false)
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar alt={userName} src={imageUrl} sx={{ width: 36, height: 36, mr: 2 }} />
                    {userName}
                </Box>
            </TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedRole}
                            onChange={(e) => onChangeEditRole(e.target.value)}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Organizer">Organizer</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    role
                )}
            </TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedOrganization}
                            onChange={(e) => setEditedOrganization(e.target.value)}
                        >
                            {editedRole === 'Organizer' && <MenuItem value="DSC">DSC</MenuItem>}
                            {editedRole === 'Organizer' && <MenuItem value="FCode">FCode</MenuItem>}
                            {editedRole === 'User' && <MenuItem value="None">None</MenuItem>}
                        </Select>
                    </FormControl>
                ) : (
                    organization !== 'FPTer' && organization
                )}
            </TableCell>
            <TableCell align="center">
                {isEdit ? (
                    <FormControl variant="standard" sx={{ mx: 1 }}>
                        <Select
                            value={editedActive}
                            onChange={(e) => setEditedActive(e.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                ) : active ? (
                    'Active'
                ) : (
                    'Inactive'
                )}
            </TableCell>
            <TableCell align="center">
                {role !== 'Admin' && (
                    <Button
                        variant="outlined"
                        color="info"
                        startIcon={<PersonIcon />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ mr: 2 }}
                    >
                        Detail
                    </Button>
                )}
                {role !== 'Admin' && (
                    <React.Fragment>
                        {isEdit ? (
                            <LoadingButton
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                color="secondary"
                                onClick={saveEditHandler}
                            >
                                Save
                            </LoadingButton>
                        ) : (
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </React.Fragment>
                )}
            </TableCell>
            {role !== 'Admin' && openDialog && (
                <UserProfile
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    userEmail={email}
                    role={role}
                />
            )}
        </TableRow>
    )
}

export default UserTableRow
