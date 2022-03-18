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

const UserFilter = ({ emailFilter, setEmailFilter, setSyncDataCounter }) => {
    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="standard" sx={{ width: '200px', mx: 2 }}>
                <InputLabel>Email</InputLabel>
                <Input
                    type="text"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
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
