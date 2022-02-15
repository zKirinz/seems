import { Search as SearchIcon } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

const SearchField = () => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Search for events</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                // type={values.showPassword ? 'text' : 'password'}
                // value={values.password}
                // onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="Search for events"
            />
        </FormControl>
    )
}

export default SearchField
