import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import SearchField from '../../../components/SearchField'
import { Box, Divider } from '@mui/material'

import EventPeriodFilter from './EventPeriodFilter'

const Filters = () => {
    const history = useHistory()
    const { search: queries } = useLocation()
    const { search, upcoming } = queryString.parse(queries)
    const [nameFilter, setNameFilter] = useState('')
    const [periodFilter, setPeriodFilter] = useState(null)

    const searchSubmitHandler = (searchText) => {
        searchText = searchText.trim()
        if (searchText !== '') {
            setNameFilter(searchText)
        }
    }

    const periodSubmitHandler = (periodOption) => {
        setPeriodFilter(periodOption)
    }

    const searchHandler = () => {
        let filterString = '?'
        let isFilter = false

        if (nameFilter !== '') {
            if (isFilter) {
                filterString += '&search=' + nameFilter
            } else {
                filterString += 'search=' + nameFilter
                isFilter = true
            }
        }

        if (periodFilter !== '') {
            if (isFilter) {
                if (periodFilter === 'true') {
                    filterString += '&upcoming=true'
                } else if (periodFilter === 'false') {
                    filterString += '&upcoming=false'
                }
            } else {
                if (periodFilter === 'true') {
                    filterString += 'upcoming=true'
                } else if (periodFilter === 'false') {
                    filterString += 'upcoming=false'
                }
            }
        }

        history.push('/events' + filterString)
    }

    useEffect(() => {
        searchHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameFilter, periodFilter])

    return (
        <Box mr={8} width="500px">
            <SearchField submitHandler={searchSubmitHandler} defaultText={search} />
            <Divider sx={{ width: '100%', backgroundColor: 'secondary.main', my: 3 }} />
            <EventPeriodFilter submitHandler={periodSubmitHandler} defaultPeriod={upcoming} />
        </Box>
    )
}

export default Filters
