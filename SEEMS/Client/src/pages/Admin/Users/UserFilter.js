import { useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    InputAdornment,
    IconButton,
} from '@mui/material'

const UserFilter = ({
    emailSubmitHandler,
    role,
    roleSubmitHandler,
    organization,
    organizationSubmitHandler,
    status,
    statusSubmitHandler,
}) => {
    const [emailSearchText, setEmailSearchText] = useState('')

    const onEnterSearch = (e) => {
        if (e.keyCode == 13) {
            emailSubmitHandler(emailSearchText)
        }
    }

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl sx={{ width: '120px', mx: 1 }}>
                <InputLabel>Role</InputLabel>
                <Select
                    value={role}
                    label="Role"
                    onChange={(e) => roleSubmitHandler(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Organizer">Organizer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ width: '120px', mx: 1 }}>
                <InputLabel>Organization</InputLabel>
                <Select
                    value={organization}
                    label="Organization"
                    onChange={(e) => organizationSubmitHandler(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="FPTU">FPTU</MenuItem>
                    <MenuItem value="FCode">FCode</MenuItem>
                    <MenuItem value="DSC">DSC</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ width: '120px', mx: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    label="Status"
                    onChange={(e) => statusSubmitHandler(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '200px', mx: 1 }}>
                <InputLabel>Email</InputLabel>
                <Input
                    type="text"
                    value={emailSearchText}
                    onChange={(e) => setEmailSearchText(e.target.value)}
                    onKeyDown={onEnterSearch}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => emailSubmitHandler(emailSearchText)}
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Email"
                />
            </FormControl>
        </Box>
    )
}

export default UserFilter
