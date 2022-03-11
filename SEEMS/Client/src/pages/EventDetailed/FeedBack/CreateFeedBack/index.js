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

const CreateFeedBack = ({ open, onClose, onCreateFeedback }) => {
    const [ratingValue, setRatingValue] = useState(0)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [feedbackContent, setFeedBackContent] = useState({ value: '', isTouched: false })

    const feedbackChangeHandler = (event) => {
        setFeedBackContent((previousValue) => ({ ...previousValue, value: event.target.value }))
    }
    const feedbackTouchedHandler = () => {
        setFeedBackContent((previousValue) => ({ ...previousValue, isTouched: true }))
    }
    const openDialog = () => {
        setConfirmDialog(true)
    }
    const closeDialog = () => {
        setConfirmDialog(false)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        console.log('Second')
    }
    const onConfirmDialog = () => {
        console.log('First')
    }

    const feedbackContentIsInValid = isEmpty(feedbackContent.value) && feedbackContent.isTouched

    return (
        <Modal open={open}>
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
                <Box sx={{ py: 5, px: 3, bgcolor: 'primary.main', color: grey[100] }}>
                    <Typography variant="h4">Your experience with the event</Typography>
                </Box>
                <Box component="form" sx={{ py: 4, px: 3 }} onSubmit={submitHandler}>
                    <Box>
                        <Typography
                            fontWeight={700}
                            sx={{ color: blueGrey[900], mb: 0.5, ml: 0.5 }}
                        >
                            Rate this event
                        </Typography>
                        <Rating
                            value={ratingValue}
                            onChange={(_, newValue) => setRatingValue(newValue)}
                        />
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
                            {feedbackContentIsInValid && (
                                <FormHelperText error={feedbackContentIsInValid}>
                                    Feedback must be not empty
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
                            onClick={onConfirmDialog}
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
                >
                    Are you sure you want to send this feedback?
                </AlertConfirm>
            </Box>
        </Modal>
    )
}

export default CreateFeedBack
