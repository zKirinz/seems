import { useState } from 'react'

import { Search as SearchIcon, Sync as SyncIcon } from '@mui/icons-material'
import {
    Box,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material'

const UserFilter = ({ setEmailFilter, setSyncDataCounter }) => {
    const [email, setEmail] = useState('')

    const onEnterSearch = (e) => {
        if (e.keyCode == 13) {
            setEmailFilter(email)
        }
    }

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="standard" sx={{ width: '200px', mx: 1 }}>
                <InputLabel>Email</InputLabel>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={onEnterSearch}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => setEmailFilter(email)}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Email"
                />
            </FormControl>
            <Box display="flex" alignItems="center">
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<SyncIcon />}
                    onClick={setSyncDataCounter}
                >
                    Sync Data
                </Button>
            </Box>
        </Box>
    )
}

export default UserFilter
