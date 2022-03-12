import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import SearchField from '../../../components/SearchField'
import { Box, Divider } from '@mui/material'

import ReservationOrganizationFilter from './ReservationOrganizationFilter'
import ReservationStatusFilter from './ReservationStatusFilter'

const Filters = () => {
    const history = useHistory()
    const { search: queries } = useLocation()
    const { search, status, organization } = queryString.parse(queries)
    const [nameFilter, setNameFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState(status)
    const [organizationFilter, setOrganizationFilter] = useState(organization)

    const searchSubmitHandler = (searchText) => {
        searchText = searchText.trim()
        if (searchText !== '') {
            setNameFilter(searchText)
        }
    }

    const statusSubmitHandler = (statusOption) => {
        setStatusFilter(statusOption)
    }

    const organizationSubmitHandler = (organizationOption) => {
        setOrganizationFilter(organizationOption)
    }

    const searchHandler = () => {
        let route = '/events/my-registrations?'

        if (nameFilter) {
            route += '&search=' + nameFilter
        }
        if (statusFilter) {
            route += '&status=' + statusFilter
        }
        if (organizationFilter) {
            route += '&organization=' + organizationFilter
        }

        history.push(route)
    }

    useEffect(() => {
        searchHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameFilter, statusFilter, organizationFilter])

    return (
        <Box mr={8} width="500px">
            <SearchField submitHandler={searchSubmitHandler} defaultText={search} />
            <Divider sx={{ width: '100%', backgroundColor: 'secondary.main', my: 3 }} />
            <ReservationStatusFilter submitHandler={statusSubmitHandler} defaultPeriod={status} />
            <ReservationOrganizationFilter
                submitHandler={organizationSubmitHandler}
                defaultPeriod={organization}
            />
        </Box>
    )
}

export default Filters
