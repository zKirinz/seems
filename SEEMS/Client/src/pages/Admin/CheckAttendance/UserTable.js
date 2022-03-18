import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import {
    LastPage as LastPageIcon,
    FirstPage as FirstPageIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@mui/icons-material'
import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material'

import { useUsersAction } from '../../../recoil/user'
import UserTableRow from './UserTableRow'

function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    )
}

const columns = [
    { id: 'name', label: 'Name', align: 'center' },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'attend', label: 'Attend', align: 'center' },
]

const UserTable = ({ emailFilter, syncDataCounter }) => {
    const { id } = useParams()
    const usersAction = useUsersAction()
    const [userData, setUserData] = useState([])
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [reset, setReset] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const rowsPerPage = 6

    useEffect(() => {
        const refetch = async () => {
            await setIsLoading(true)
            await usersAction.getRegisteredUserOfEvent(id).then((res) => {
                if (res.data.data) {
                    setUserData(res.data.data)
                    setRows(res.data.data)
                } else {
                    setUserData([])
                    setRows([])
                }
            })

            setTimeout(() => {
                setIsLoading(false)
            }, 1500)
        }

        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncDataCounter])

    useEffect(() => {
        usersAction.getRegisteredUserOfEvent(id).then((res) => {
            if (res.data.data) {
                setUserData(res.data.data)
                setRows(res.data.data)
            } else {
                setUserData([])
                setRows([])
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset])

    useEffect(() => {
        setPage(0)
        setRows(
            userData.filter(({ email }) => {
                if (
                    emailFilter.trim() !== '' &&
                    !email.toLowerCase().includes(emailFilter.toLowerCase())
                ) {
                    return false
                }
                return true
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailFilter])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isLoading ? (
                <Box
                    width="100%"
                    height="300px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress thickness={4} color="secondary" />
                </Box>
            ) : (
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map(({ email, userName, imageUrl, attend, reservationId }) => {
                                return (
                                    <UserTableRow
                                        key={email}
                                        email={email}
                                        userName={userName}
                                        imageUrl={imageUrl}
                                        attend={attend}
                                        reservationId={reservationId}
                                        resetHandler={() => setReset(reset + 1)}
                                    />
                                )
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {rows.length === 0 && emailFilter.trim() === '' && (
                        <Box display="flex" justifyContent="center" mt={10} mb={6}>
                            <Typography variant="body1">No user have registered yet</Typography>
                        </Box>
                    )}
                    {rows.length === 0 && emailFilter.trim() !== '' && (
                        <Box display="flex" justifyContent="center" mt={10} mb={6}>
                            <Typography variant="body1">Cannot find any users</Typography>
                        </Box>
                    )}
                </TableContainer>
            )}
            <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    )
}

export default UserTable
