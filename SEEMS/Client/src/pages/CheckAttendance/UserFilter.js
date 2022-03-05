import { Search as SearchIcon } from '@mui/icons-material'
import { Box, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material'

const UserFilter = ({ emailFilter, setEmailFilter }) => {
    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="standard" sx={{ width: '200px', mx: 1 }}>
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
        </Box>
    )
}

export default UserFilter
