import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import QrReader from 'react-qr-scanner'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Typography, Box, Button } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'
import LoadingPage from '../../Loading'
import UserFilter from './UserFilter'
import UserTable from './UserTable'

const CheckAttendance = () => {
    const { id } = useParams()
    const history = useHistory()
    const { search: queries } = useLocation()
    const { QRCode } = queryString.parse(queries)
    const { checkIsMyEvent, checkCanAttendance } = useEventAction()
    const showSnackbar = useSnackbar()
    const [emailFilter, setEmailFilter] = useState('')
    const [attendanceDisable, setAttendanceDisable] = useState(true)

    useEffect(() => {
        checkIsMyEvent(id)
            .then((response) => {
                if (!response.data.data.isMine) {
                    history.push('/admin')
                }

                checkCanAttendance(id).then((res) => {
                    if (!res.data.data.canTakeAttendance) {
                        history.push('/admin')
                    }
                    setAttendanceDisable(false)
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const triggerQRCodeScanner = () => {
        window.open(
            `${window.location.href}?QRCode=true`,
            'QRCode',
            'width=' + window.screen.availWidth + ',height=' + window.screen.availHeight
        )
    }

    return attendanceDisable ? (
        <LoadingPage />
    ) : (
        <Box component="main" minHeight="65vh" mt={8.5} mb={10} mx={16} pt={8}>
            {QRCode ? (
                <React.Fragment>
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={5}
                    >
                        <Typography variant="h3" color="primary" fontWeight={700} mb={5}>
                            Users Attendance With QR Code
                        </Typography>
                        <Box width="100%" height="500px" display="flex" justifyContent="center">
                            <QrReader
                                delay={2000}
                                onError={(err) => console.log(err)}
                                onScan={(data) => console.log(data && data.text)}
                            />
                        </Box>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={5}
                    >
                        <Typography variant="h3" color="primary" fontWeight={700} mb={2}>
                            Users Attendance
                        </Typography>
                        <Button variant="outlined" onClick={() => triggerQRCodeScanner()}>
                            Check In With QR Scanner
                        </Button>
                    </Box>
                    <UserFilter emailFilter={emailFilter} setEmailFilter={setEmailFilter} />
                    <UserTable emailFilter={emailFilter} />
                </React.Fragment>
            )}
        </Box>
    )
}

export default CheckAttendance
