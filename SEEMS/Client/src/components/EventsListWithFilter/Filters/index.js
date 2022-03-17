import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import SearchField from '../../../components/SearchField'
import { Box, Divider } from '@mui/material'

import pageEnum from '../pageEnum'
import EventActiveFilter from './EventActiveFilter'
import EventOrganizationFilter from './EventOrganizationFilter'
import EventPeriodFilter from './EventPeriodFilter'
import EventStatusFilter from './EventStatusFilter'

const Filters = ({ page }) => {
    const history = useHistory()
    const { search: queries } = useLocation()
    const { search, upcoming, active, myEventStatus, organizationName } = queryString.parse(queries)
    const [nameFilter, setNameFilter] = useState('')
    const [eventStatus, setEventStatus] = useState(myEventStatus)
    const [periodFilter, setPeriodFilter] = useState(upcoming)
    const [activeFilter, setActiveFilter] = useState(active)
    const [organizationNameFilter, setOrganizationNameFilter] = useState(organizationName)

    const searchSubmitHandler = (searchText) => {
        searchText = searchText.trim()
        if (searchText !== '') {
            setNameFilter(searchText)
        }
    }

    const eventStatusHandler = (eventStatusOption) => {
        setEventStatus(eventStatusOption)
    }

    const periodSubmitHandler = (periodOption) => {
        setPeriodFilter(periodOption)
    }

    const activeSubmitHandler = (activeOption) => {
        setActiveFilter(activeOption)
    }

    const organizationNameSubmitHandler = (organizationNameOption) => {
        setOrganizationNameFilter(organizationNameOption)
    }

    const searchHandler = () => {
        let route = page + '?'

        if (nameFilter) {
            route += '&search=' + nameFilter
        }
        if (eventStatus) {
            route += '&myEventStatus=' + eventStatus
        }
        if (periodFilter) {
            route += '&upcoming=' + periodFilter
        }
        if (activeFilter) {
            route += '&active=' + activeFilter
        }
        if (organizationNameFilter) {
            route += '&organizationName=' + organizationNameFilter
        }

        history.push(route)
    }

    useEffect(() => {
        searchHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameFilter, eventStatus, periodFilter, activeFilter, organizationNameFilter])

    return (
        <Box mr={8} width="500px">
            <SearchField submitHandler={searchSubmitHandler} defaultText={search} />
            <Divider sx={{ width: '100%', backgroundColor: 'secondary.main', my: 3 }} />
            {(page === pageEnum.AdminMyEvents || page === pageEnum.MyEvents) && (
                <EventStatusFilter submitHandler={eventStatusHandler} defaultPeriod={eventStatus} />
            )}
            <EventPeriodFilter submitHandler={periodSubmitHandler} defaultPeriod={upcoming} />
            {(page === pageEnum.AdminAllEvents || page === pageEnum.AllEvents) && (
                <EventActiveFilter submitHandler={activeSubmitHandler} defaultPeriod={active} />
            )}
            {(page === pageEnum.AdminAllEvents || page === pageEnum.AllEvents) && (
                <EventOrganizationFilter
                    submitHandler={organizationNameSubmitHandler}
                    defaultPeriod={organizationName}
                />
            )}
        </Box>
    )
}

export default Filters
