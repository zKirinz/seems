import React, { useState } from 'react'

import { Send } from '@mui/icons-material'
import { Box, Button, FormControl, Modal, Rating, TextField, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'

const CreateFeedBack = ({ open, onClose }) => {
    const [ratingValue, setRatingValue] = useState(0)
    const [feedbackContent, setFeedBackContent] = useState()

    const feedbackHandler = (event) => {
        setFeedBackContent(event.target.value)
    }

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
                <Box component="form" sx={{ py: 4, px: 3 }}>
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
                                value={feedbackContent}
                                multiline
                                minRows={3}
                                maxRows={10}
                                placeholder="Feedback here"
                                onChange={feedbackHandler}
                            />
                        </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button variant="contained" color="error" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<Send />} sx={{ ml: 2 }}>
                            Send feedback
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateFeedBack
