import React, { useEffect, useState } from 'react'

import { CheckCircle, RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useFeedbackAction } from '../../../recoil/feedback'
import CreateFeedBack from './CreateFeedBack'
import ViewListFeedBack from './ViewListFeedBack'

const FeedBack = ({ eventId, isMyEvent }) => {
    const { createFeedback, checkCanFeedback } = useFeedbackAction()
    const showSnackBar = useSnackbar()
    const [openCreateFeedback, setOpenCreateFeedback] = useState(false)
    const [openViewFeedbacks, setOpenViewFeedbacks] = useState(false)
    const [attendance, setAttendance] = useState(false)
    const [canFeedback, setCanFeedback] = useState(false)
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
                setCanFeedback(canUserFeedback)
                closeHandler()
                showSnackBar({
                    severity: 'success',
                    children: 'Sending feedback successfully, thank you for you feedback',
                })
            })
            .catch((error) => {
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
        checkCanFeedback(eventId)
            .then((response) => {
                console.log(response)
                const canFeedbackOrNot = response.data.data
                setCanFeedback(canFeedbackOrNot)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {/* Add attendance check */}
            {attendance && canFeedback && !isMyEvent && (
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
            {attendance && !canFeedback && !isMyEvent && (
                <Fab sx={{ position: 'fixed', bottom: 100, right: 40 }} variant="extended" disabled>
                    <CheckCircle sx={{ mr: 0.5 }} color="success" />
                    Feedback
                </Fab>
            )}
            {!isMyEvent && (
                <CreateFeedBack
                    open={openCreateFeedback}
                    onClose={closeCreateFeedbackHandler}
                    onCreateFeedback={createFeedBackHandler}
                    error={error}
                    setError={setError}
                />
            )}
            {isMyEvent && (
                <ViewListFeedBack open={openViewFeedbacks} onClose={closeViewFeedbacksHandler} />
            )}
        </React.Fragment>
    )
}

export default FeedBack
