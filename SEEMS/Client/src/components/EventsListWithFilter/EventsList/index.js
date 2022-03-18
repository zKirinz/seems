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
import EventCard from '../EventCard'
import pageEnum from '../pageEnum'

const filterStringGenerator = ({ search, upcoming, active, myEventStatus, organizationName }) => {
    let filterString = '?resultCount=6'
    if (search && search.trim() !== '') {
        filterString += '&search=' + search
    }

    if (myEventStatus !== undefined) {
        if (myEventStatus === 'Pending') {
            filterString += '&myEventStatus=Pending'
        } else if (myEventStatus === 'TakingAttendance') {
            filterString += '&myEventStatus=TakingAttendance'
        } else if (myEventStatus === 'Finished') {
            filterString += '&myEventStatus=Finished'
        }
    }

    if (upcoming !== undefined) {
        if (upcoming === 'true') {
            filterString += '&upcoming=true'
        } else if (upcoming === 'false') {
            filterString += '&upcoming=false'
        }
    }

    if (active !== undefined) {
        if (active === 'true') {
            filterString += '&active=true'
        } else if (active === 'false') {
            filterString += '&active=false'
        }
    }

    if (organizationName !== undefined) {
        if (organizationName === 'FPTU') {
            filterString += '&organizationName=FPTU'
        } else if (organizationName === 'FCode') {
            filterString += '&organizationName=FCode'
        } else if (organizationName === 'DSC') {
            filterString += '&organizationName=DSC'
        }
    }

    return filterString
}

const EventsList = ({ page }) => {
    const auth = useRecoilValue(authAtom)
    const { search: queries } = useLocation()
    const { search, upcoming, active, myEventStatus, organizationName } = queryString.parse(queries)
    const eventAction = useEventAction()
    const [events, setEvents] = useState([])
    const [eventsNumber, setEventsNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const showSnackbar = useSnackbar()
    let lastEventId
    const isFilter = !!search || !!upcoming || !!active || !!myEventStatus || !!organizationName

    const Loading = () => (
        <Box display="flex" justifyContent="center" my={20}>
            <CircularProgress thickness={4} color="secondary" />
        </Box>
    )

    const loadMoreHandler = () => {
        let params = filterStringGenerator({
            search,
            upcoming,
            active,
            myEventStatus,
            organizationName,
        })
        params += '&lastEventID=' + lastEventId

        if (page === pageEnum.AdminMyEvents || page === pageEnum.MyEvents) {
            eventAction
                .getMyEvents(params)
                .then((res) => {
                    setTimeout(() => {
                        setEvents(events.concat(res.data.data.listEvents))
                        setHasMore(res.data.data.canLoadMore)
                    }, 1200)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                })
        } else if (page === pageEnum.AdminAllEvents || page === pageEnum.AllEvents) {
            eventAction
                .getEvents(params)
                .then((res) => {
                    setTimeout(() => {
                        setEvents(events.concat(res.data.data.listEvents))
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
    }

    useEffect(() => {
        setIsLoading(true)

        let params = filterStringGenerator({
            search,
            upcoming,
            active,
            myEventStatus,
            organizationName,
        })

        if (page === pageEnum.AdminMyEvents || page === pageEnum.MyEvents) {
            eventAction
                .getMyEvents(params)
                .then((res) => {
                    setEvents(res.data.data.listEvents)
                    setEventsNumber(res.data.data.count)
                    setHasMore(res.data.data.canLoadMore)
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    setIsLoading(false)
                })
        } else if (page === pageEnum.AdminAllEvents || page === pageEnum.AllEvents) {
            eventAction
                .getEvents(params)
                .then((res) => {
                    setEvents(res.data.data.listEvents)
                    setEventsNumber(res.data.data.count)
                    setHasMore(res.data.data.canLoadMore)
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    setIsLoading(false)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, upcoming, active, myEventStatus, organizationName])

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
                                    There are no more events to load
                                </Alert>
                            </Box>
                        }
                    >
                        <Grid container rowGap={4}>
                            {events.map(
                                (
                                    {
                                        id,
                                        eventTitle,
                                        eventDescription,
                                        startDate,
                                        imageUrl,
                                        organizationName,
                                        canRegister,
                                        myEventStatus,
                                    },
                                    i,
                                    { length }
                                ) => {
                                    if (i + 1 === length) {
                                        lastEventId = id
                                    }

                                    return (
                                        <Grid item xs={12} key={id}>
                                            <EventCard
                                                id={id}
                                                canRegister={canRegister}
                                                title={eventTitle}
                                                description={eventDescription}
                                                startDate={startDate}
                                                imageUrl={imageUrl}
                                                organizer={organizationName}
                                                isMyEventPage={
                                                    page === pageEnum.AdminMyEvents ||
                                                    page === pageEnum.MyEvents
                                                }
                                                eventStatus={myEventStatus}
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
                        Cannot find any events
                    </Alert>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center">
                    <Alert icon={<EventBusyIcon />} variant="outlined" severity="warning">
                        {auth.role === 'Admin' || auth.role === 'Organizer' ? (
                            <React.Fragment>
                                There is not any events here, let&apos;s{' '}
                                <RouterLink
                                    to={
                                        auth.role === 'Admin'
                                            ? '/admin/events/create'
                                            : '/events/create'
                                    }
                                >
                                    <Link component="span">create one!</Link>
                                </RouterLink>{' '}
                            </React.Fragment>
                        ) : (
                            'There is not any events here, please come back later!'
                        )}
                    </Alert>
                </Box>
            )}
        </Box>
    )
}

export default EventsList
