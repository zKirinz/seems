import React, { useEffect, useState } from 'react'

import { CheckCircle, RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useFeedbackAction } from '../../../recoil/feedback'
import CreateFeedback from './CreateNewFeedback'
import ViewListFeedback from './ViewFeedbacks'

const FeedBack = ({ eventId, isMyEvent }) => {
    const { createFeedback, checkCanFeedback, getFeedbacksOfEvent } = useFeedbackAction()
    const showSnackBar = useSnackbar()
    const [openCreateFeedback, setOpenCreateFeedback] = useState(false)
    const [openViewFeedbacks, setOpenViewFeedbacks] = useState(false)
    const [canFeedback, setCanFeedback] = useState({
        attendance: false,
        ableToFeedback: false,
    })
    const [error, setError] = useState({
        content: null,
        rating: null,
    })

    const openCreateFeedbackHandler = () => {
        setOpenCreateFeedback(true)
    }
    const closeCreateFeedbackHandler = () => {
        setOpenCreateFeedback(false)
    }
    const openViewFeedbacksHandler = () => {
        setOpenViewFeedbacks(true)
    }
    const closeViewFeedbacksHandler = () => {
        setOpenViewFeedbacks(false)
    }
    const createFeedBackHandler = (feedbackData) => {
        const feedbackWithEventId = { ...feedbackData, eventId: +eventId }
        createFeedback(feedbackWithEventId)
            .then((response) => {
                const canUserFeedback = response.data.data.canFeedBack

                setCanFeedback((previousValue) => ({
                    ...previousValue,
                    ableToFeedback: canUserFeedback,
                }))
                closeCreateFeedbackHandler()
                showSnackBar({
                    severity: 'success',
                    children: 'Sending feedback successfully, thank you for you feedback',
                })
            })
            .catch(() => {
                if (error.response.data.code === 422) {
                    if (error.response.data.message) {
                        showSnackBar({
                            severity: 'error',
                            children: `Sending feedback failed, ${error.response.data.message}`,
                        })
                    } else {
                        const errorResponse = error.response.data.data
                        setError({
                            content: errorResponse.content,
                            rating: errorResponse.rating,
                        })
                    }
                } else {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                }
            })
    }

    useEffect(() => {
        if (!isMyEvent) {
            checkCanFeedback(eventId)
                .then((response) => {
                    const canFeedbackOrNot = response.data.data
                    setCanFeedback({
                        attendance: canFeedbackOrNot.attend,
                        ableToFeedback: canFeedbackOrNot.canFeedBack,
                    })
                })
                .catch(() => {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {canFeedback.attendance && canFeedback.ableToFeedback && !isMyEvent && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: 100, right: 40 }}
                    onClick={openCreateFeedbackHandler}
                    variant="extended"
                >
                    <Tooltip title="Feedback" sx={{ mr: 1 }}>
                        <RateReview />
                    </Tooltip>
                    Feedback
                </Fab>
            )}
            {isMyEvent && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: 100, right: 40 }}
                    onClick={openViewFeedbacksHandler}
                    variant="extended"
                >
                    <Tooltip title="Feedback" sx={{ mr: 1 }}>
                        <RateReview />
                    </Tooltip>
                    Feedback
                </Fab>
            )}
            {canFeedback.attendance && !canFeedback.ableToFeedback && !isMyEvent && (
                <Fab sx={{ position: 'fixed', bottom: 100, right: 40 }} variant="extended" disabled>
                    <CheckCircle sx={{ mr: 0.5 }} color="success" />
                    Feedback
                </Fab>
            )}
            {!isMyEvent && (
                <CreateFeedback
                    open={openCreateFeedback}
                    onClose={closeCreateFeedbackHandler}
                    onCreateFeedback={createFeedBackHandler}
                    error={error}
                    setError={setError}
                />
            )}
            {isMyEvent && openViewFeedbacks && (
                <ViewListFeedback
                    open={openViewFeedbacks}
                    onClose={closeViewFeedbacksHandler}
                    eventId={eventId}
                    getFeedbacksOfEvent={getFeedbacksOfEvent}
                />
            )}
        </React.Fragment>
    )
}

export default FeedBack
