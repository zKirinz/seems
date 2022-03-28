import React, { useCallback, useEffect, useState } from 'react'

import queryString from 'query-string'
import QrReader from 'react-qr-scanner'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Typography, Box, Button } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useEventAction } from '../../../recoil/event'
import { useUsersAction } from '../../../recoil/user'
import LoadingPage from '../../Loading'
import UserFilter from './UserFilter'
import UserTable from './UserTable'

let qrLock = false

const CheckAttendance = () => {
    const { id } = useParams()
    const history = useHistory()
    const { search: queries } = useLocation()
    const { QRCode } = queryString.parse(queries)
    const { takeUserAttendOfEvent } = useUsersAction()
    const { checkIsMyEvent, checkCanAttendance } = useEventAction()
    const showSnackbar = useSnackbar()
    const [emailFilter, setEmailFilter] = useState('')
    const [attendanceDisable, setAttendanceDisable] = useState(true)
    const [qrError, setQRError] = useState(false)
    const [syncDataCounter, setSyncDataCounter] = useState(0)

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

    const scanHandler = (data) => {
        if (qrLock) {
            return
        }
        try {
            qrLock = true
            setTimeout(() => {
                qrLock = false
            }, 1200)

            if (data !== null && data.text) {
                const { Email, EventId, ReservationId } = JSON.parse(data.text)
                if (EventId !== parseInt(id)) {
                    showSnackbar({
                        severity: 'error',
                        children: 'This is not QR Code of this event!',
                    })
                    return
                }

                takeUserAttendOfEvent({
                    reservationId: ReservationId,
                    attend: true,
                })
                    .then((res) => {
                        if (res.data.data && res.data.data.errorCode === 'ALREADY_ATTENDED') {
                            showSnackbar({
                                severity: 'warning',
                                children: `User ${Email} is already attended.`,
                            })
                        } else {
                            showSnackbar({
                                severity: 'success',
                                children: `User ${Email} takes attendance successfully.`,
                            })
                        }
                    })
                    .catch(() => {
                        showSnackbar({
                            severity: 'error',
                            children: 'Something went wrong, please try again later.',
                        })
                    })
            }
        } catch (error) {
            showSnackbar({
                severity: 'error',
                children: 'Invalid QR Code, please try other QR Code!',
            })
        }
    }

    const onErrorHandler = useCallback(() => setQRError(true), [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onScanHandler = useCallback((data) => scanHandler(data), [])

    return attendanceDisable ? (
        <LoadingPage />
    ) : (
        <Box component="main" minHeight="65vh" mt={8.5} mb={10} mx={16} pt={8}>
            {QRCode ? (
                <Box width="100%" display="flex" flexDirection="column" alignItems="center" mb={5}>
                    <Typography variant="h3" color="primary" fontWeight={700} mb={5}>
                        Users Attendance With QR Code
                    </Typography>
                    <Box width="100%" height="500px" display="flex" justifyContent="center">
                        {qrError ? (
                            <Typography variant="h5" mt={12}>
                                Something went wrong with your camera, please fix it and reload!
                            </Typography>
                        ) : (
                            <QRScanner onError={onErrorHandler} onScan={onScanHandler} />
                        )}
                    </Box>
                </Box>
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
                    <UserFilter
                        setEmailFilter={setEmailFilter}
                        setSyncDataCounter={() => setSyncDataCounter(syncDataCounter + 1)}
                    />
                    <UserTable emailFilter={emailFilter} syncDataCounter={syncDataCounter} />
                </React.Fragment>
            )}
        </Box>
    )
}

const QRScanner = React.memo(({ onError, onScan }) => (
    <QrReader delay={100} onError={onError} onScan={onScan} />
))

export default CheckAttendance
