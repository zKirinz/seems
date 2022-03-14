import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { EventBusy as EventBusyIcon, EventRepeat as EventRepeatIcon } from '@mui/icons-material'
import { Grid, Box, Alert, Link, CircularProgress, Divider, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import authAtom from '../../../recoil/auth'
import useEventAction from '../../../recoil/event/action'
import ReservationCard from '../ReservationCard'

const filterStringGenerator = ({ search, status, organization }) => {
    let filterString = '?resultCount=6'
    if (search && search.trim() !== '') {
        filterString += '&search=' + search
    }

    if (status !== undefined) {
        filterString += '&reservationStatus=' + status
    }

    if (organization !== undefined) {
        filterString += '&organizationName=' + organization
    }

    return filterString
}

const ReservationsList = () => {
    const auth = useRecoilValue(authAtom)
    const { search: queries } = useLocation()
    const { search, status, organization } = queryString.parse(queries)
    const eventAction = useEventAction()
    const [events, setEvents] = useState([])
    const [eventsNumber, setEventsNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const showSnackbar = useSnackbar()
    let lastReservationId
    const isFilter = !!search || !!status || !!organization

    const Loading = () => (
        <Box display="flex" justifyContent="center" my={20}>
            <CircularProgress thickness={4} color="secondary" />
        </Box>
    )

    const loadMoreHandler = () => {
        let filterString = filterStringGenerator({ search, status, organization })

        filterString += '&lastReservationId=' + lastReservationId
        eventAction
            .getMyRegistrations(filterString)
            .then((res) => {
                setTimeout(() => {
                    setEvents(events.concat(res.data.data.events))
                    setHasMore(res.data.data.canLoadMore)
                }, 1200)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
    }

    useEffect(() => {
        setIsLoading(true)

        let filterString = filterStringGenerator({ search, status, organization })
        eventAction
            .getMyRegistrations(filterString)
            .then((res) => {
                if (res.data.data) {
                    setEvents(res.data.data.events)
                    setEventsNumber(res.data.data.count)
                    setHasMore(res.data.data.canLoadMore)
                } else {
                    setEvents([])
                    setEventsNumber(0)
                    setHasMore(false)
                }
                setIsLoading(false)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, status, organization])

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
            <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%" mb={5}>
                <Typography>{eventsNumber} results</Typography>
                <Divider sx={{ width: '30%', height: '5px', backgroundColor: 'grey' }} />
            </Box>
            {isLoading ? (
                <Loading />
            ) : events.length ? (
                <Box width="100%">
                    <InfiniteScroll
                        dataLength={events.length}
                        loader={<Loading />}
                        next={loadMoreHandler}
                        hasMore={hasMore}
                        endMessage={
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Alert
                                    icon={<EventRepeatIcon />}
                                    variant="outlined"
                                    severity="warning"
                                >
                                    There are no more registration to load
                                </Alert>
                            </Box>
                        }
                    >
                        <Grid container rowGap={4}>
                            {events.map(
                                (
                                    {
                                        id,
                                        reservationId,
                                        eventTitle,
                                        eventDescription,
                                        startDate,
                                        imageUrl,
                                        organizationName,
                                        reservationStatus,
                                    },
                                    i,
                                    { length }
                                ) => {
                                    if (i + 1 === length) {
                                        lastReservationId = reservationId
                                    }

                                    return (
                                        <Grid item xs={12} key={id}>
                                            <ReservationCard
                                                id={id}
                                                title={eventTitle}
                                                description={eventDescription}
                                                startDate={startDate}
                                                imageUrl={imageUrl}
                                                organizer={organizationName}
                                                reservationStatus={reservationStatus}
                                            />
                                        </Grid>
                                    )
                                }
                            )}
                        </Grid>
                    </InfiniteScroll>
                </Box>
            ) : isFilter ? (
                <Box display="flex" justifyContent="center">
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        Cannot find any registrations.
                    </Alert>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center">
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        There is not any registrations here, let&apos;s{' '}
                        <RouterLink to={auth.role === 'Admin' ? '/admin/events' : '/events'}>
                            <Link component="span">register!</Link>
                        </RouterLink>
                    </Alert>
                </Box>
            )}
        </Box>
    )
}

export default ReservationsList
