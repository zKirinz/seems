import React, { useState } from 'react'

import { RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useFeedbackAction } from '../../../recoil/feedback'
import CreateFeedBack from './CreateFeedBack'
import ViewListFeedBack from './ViewListFeedBack'

const FeedBack = ({ eventId, isMyEvent }) => {
    const { createFeedback } = useFeedbackAction()
    const showSnackBar = useSnackbar()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({
        content: null,
        rating: null,
    })
    const [canFeedback, setCanFeedback] = useState(true)

    const openHandler = () => {
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
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

    return (
        <React.Fragment>
            {canFeedback && !isMyEvent && (
                <Fab
                    color="primary"
                    sx={{ position: 'fixed', bottom: 100, right: 40 }}
                    onClick={openHandler}
                    variant="extended"
                >
                    <Tooltip title="Feedback" sx={{ mr: 1 }}>
                        <RateReview />
                    </Tooltip>
                    Feedback
                </Fab>
            )}
            {!isMyEvent && (
                <CreateFeedBack
                    open={open}
                    onClose={closeHandler}
                    onCreateFeedback={createFeedBackHandler}
                    error={error}
                    setError={setError}
                />
            )}
            {isMyEvent && <ViewListFeedBack open={open} onClose={closeHandler} />}
        </React.Fragment>
    )
}

export default FeedBack
