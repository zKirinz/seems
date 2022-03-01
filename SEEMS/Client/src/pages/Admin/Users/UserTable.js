import { useState, useEffect } from 'react'

import {
    LastPage as LastPageIcon,
    FirstPage as FirstPageIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@mui/icons-material'
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, // TableFooter,
    TableHead,
    TablePagination, // TablePagination,
    TableRow,
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
    { id: 'role', label: 'Role', align: 'center' },
    { id: 'organization', label: 'Organization', align: 'center' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'action', label: 'Action', align: 'center' },
]

const UserTable = ({ emailFilter, roleFilter, organizationFilter, statusFilter }) => {
    const usersAction = useUsersAction()
    const [userData, setUserData] = useState([])
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [reset, setReset] = useState(0)
    const rowsPerPage = 6

    useEffect(() => {
        usersAction.getUsers().then((res) => {
            setUserData(res.data.data)
            setRows(res.data.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset])

    useEffect(() => {
        setPage(0)
        setRows(
            userData.filter(({ user, organization, role = 'User' }) => {
                if (
                    emailFilter.trim() !== '' &&
                    !user.email.toLowerCase().includes(emailFilter.toLowerCase())
                ) {
                    return false
                }
                if (roleFilter !== 'All' && role !== roleFilter) {
                    return false
                }
                if (organizationFilter !== 'All' && organization !== organizationFilter) {
                    return false
                }
                if (statusFilter !== 'All') {
                    if (user.active && statusFilter === 'Inactive') {
                        return false
                    }
                    if (!user.active && statusFilter === 'Active') {
                        return false
                    }
                }
                return true
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailFilter, roleFilter, organizationFilter, statusFilter])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        ).map(({ user, organization, role = 'User' }) => {
                            return (
                                <UserTableRow
                                    key={user.id}
                                    id={user.id}
                                    email={user.email}
                                    userName={user.userName}
                                    imageUrl={user.imageUrl}
                                    organization={organization}
                                    role={role}
                                    active={user.active}
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
            </TableContainer>
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
