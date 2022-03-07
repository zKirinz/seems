import { Box, Button } from '@mui/material'

const CheckAttendanceButton = ({ onClickHandler }) => {
    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={onClickHandler}>
            <Button variant="contained" color="secondary">
                Check Attendance
            </Button>
        </Box>
    )
}

export default CheckAttendanceButton
