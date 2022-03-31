import React, { useState } from 'react'

import AlertConfirm from '../../../../components/ConfirmDialog'
import { Send } from '@mui/icons-material'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Modal,
    Rating,
    TextField,
    Typography,
} from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'

const isEmpty = (incomeValue) => incomeValue.trim().length === 0

const CreateFeedback = ({ open, onClose, onCreateFeedback, error, setError }) => {
    const [ratingValue, setRatingValue] = useState({ value: 0, isTouched: false })
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [feedbackContent, setFeedBackContent] = useState({ value: '', isTouched: false })
    const ratingChangeHandler = (newValue) => {
        error?.rating && setError((previousError) => ({ ...previousError, rating: null }))
        setRatingValue((previousValue) => ({ ...previousValue, value: +newValue }))
    }
    const ratingTouchedHandler = () => {
        setRatingValue((previousValue) => ({ ...previousValue, isTouched: true }))
    }
    const feedbackChangeHandler = (event) => {
        error?.content && setError((previousError) => ({ ...previousError, content: null }))
        setFeedBackContent((previousValue) => ({ ...previousValue, value: event.target.value }))
    }
    const feedbackTouchedHandler = () => {
        setFeedBackContent((previousValue) => ({ ...previousValue, isTouched: true }))
    }
    const openDialog = () => {
        if (overallIsInValid) {
            if (isEmpty(feedbackContent.value))
                setError((previous) => ({ ...previous, content: 'Feedback must be not empty' }))
            if (+ratingValue.value === 0)
                setError((previous) => ({
                    ...previous,
                    rating: 'You have to rate quality before sending feedback',
                }))
        } else setConfirmDialog(true)
    }
    const closeDialog = () => {
        setConfirmDialog(false)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        const feedbackData = {
            content: feedbackContent.value,
            rating: ratingValue.value,
        }
        onCreateFeedback(feedbackData)
    }
    const onConfirmDialog = (event) => {
        submitHandler(event)
    }

    const feedbackContentIsInValid = isEmpty(feedbackContent.value) && feedbackContent.isTouched
    const ratingIsInvalid = ratingValue.value === 0 && ratingValue.isTouched
    const overallIsInValid = isEmpty(feedbackContent.value) || +ratingValue.value === 0

    return (
        <Modal open={open} onBackdropClick={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: 24,
                }}
            >
                <Box sx={{ py: 3, px: 3, bgcolor: 'primary.main', color: grey[100] }}>
                    <Typography variant="h5">How do you feel about the event?</Typography>
                </Box>
                <Box sx={{ py: 4, px: 3 }}>
                    <Box>
                        <Typography
                            fontWeight={700}
                            sx={{ color: blueGrey[900], mb: 0.5, ml: 0.5 }}
                        >
                            Rate this event
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Rating
                                value={ratingValue.value}
                                onChange={(_, newValue) => ratingChangeHandler(newValue)}
                                sx={{ mr: 1 }}
                                onBlur={ratingTouchedHandler}
                            />
                            {(!!error?.rating || ratingIsInvalid) && (
                                <Typography color="error" component="span" variant="body2">
                                    {error?.rating
                                        ? `${error.rating}`
                                        : 'You have to rate quality before sending feedback'}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ mt: 3, ml: 0.5 }}>
                        <Typography fontWeight={700} sx={{ color: blueGrey[900], mb: 1.5 }}>
                            Your feedback!
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                value={feedbackContent.value}
                                multiline
                                minRows={3}
                                maxRows={10}
                                placeholder="Feedback here"
                                onChange={feedbackChangeHandler}
                                onBlur={feedbackTouchedHandler}
                            />
                            {(!!error?.content || feedbackContentIsInValid) && (
                                <FormHelperText
                                    error={!!error?.content || feedbackContentIsInValid}
                                >
                                    {error?.content
                                        ? `${error.content}`
                                        : 'Feedback must be not empty'}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button variant="contained" color="error" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<Send />}
                            sx={{ ml: 2 }}
                            onClick={openDialog}
                            type="submit"
                        >
                            Send feedback
                        </Button>
                    </Box>
                </Box>
                <AlertConfirm
                    open={confirmDialog}
                    onClose={closeDialog}
                    btnConfirmText="Save"
                    title="You can not change feedback after sending"
                    onConfirm={onConfirmDialog}
                >
                    Are you sure you want to send this feedback?
                </AlertConfirm>
            </Box>
        </Modal>
    )
}

export default CreateFeedback
