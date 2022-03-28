import { useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

const SearchField = ({ submitHandler, defaultText = '', label = 'Search for events name' }) => {
    const [searchText, setSearchText] = useState(defaultText)

    const onEnterSearch = (e) => {
        if (e.keyCode == 13) {
            submitHandler(searchText)
        }
    }

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={onEnterSearch}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => submitHandler(searchText)} edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export default SearchField
