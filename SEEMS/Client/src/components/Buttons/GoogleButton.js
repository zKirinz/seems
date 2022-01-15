import { Google as GoogleIcon } from '@mui/icons-material'
import { Button } from '@mui/material'

const GoogleButton = () => {
    return (
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}>
            <GoogleIcon sx={{ mx: 1 }} />
            Sign In with Google
        </Button>
    )
}

export default GoogleButton
