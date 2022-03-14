import { useEffect, useState } from 'react'

import { Box, Button, Tooltip } from '@mui/material'

import { useSnackbar } from '../../../../HOCs/SnackbarContext'
import useEventAction from '../../../../recoil/event/action'

const CheckAttendanceButton = ({ eventId, onClickHandler }) => {
    const { checkCanAttendance } = useEventAction()
    const [attendanceDisable, setAttendanceDisable] = useState(true)
    const showSnackbar = useSnackbar()

    useEffect(() => {
        checkCanAttendance(eventId)
            .then((res) => {
                setAttendanceDisable(!res.data.data.canTakeAttendance)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Tooltip
                title={
                    attendanceDisable
                        ? 'You can only take attendance before the event begins 1 hour'
                        : "It's check in time"
                }
                placement="top"
            >
                <span>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={attendanceDisable}
                        onClick={onClickHandler}
                    >
                        Check Attendance
                    </Button>
                </span>
            </Tooltip>
        </Box>
    )
}

export default CheckAttendanceButton
