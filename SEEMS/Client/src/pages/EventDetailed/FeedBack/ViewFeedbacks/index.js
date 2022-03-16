import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    Tooltip,
    Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'

import { useSnackbar } from '../../../../HOCs/SnackbarContext'
import ListFeedback from './ListFeedback'

const Loading = () => (
    <Box display="flex" justifyContent="center" my={3}>
        <CircularProgress thickness={4} color="secondary" />
    </Box>
)

const ViewListFeedback = ({ open, onClose, getFeedbacksOfEvent, eventId }) => {
    const showSnackBar = useSnackbar()
    const [feedbacks, setFeedbacks] = useState([])
    const [averageRating, setAverageRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getFeedbacksOfEvent(eventId)
            .then((response) => {
                const feedbacksData = response.data.data.listFeedBacks
                const rating = response.data.data.averageRating

                setFeedbacks(feedbacksData)
                setAverageRating(rating)
                setFirstLoading(false)
                setIsLoading(false)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setFirstLoading(false)
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Dialog scroll={'paper'} open={open} onBackdropClick={onClose}>
            <DialogTitle>View Feedbacks</DialogTitle>
            <DialogContent dividers id="scrollableDialog" sx={{ minWidth: 500 }}>
                {isLoading && <Loading />}
                {!firstLoading && (
                    <ListFeedback feedbacks={feedbacks} averageRating={averageRating} />
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Box>
                    {averageRating !== 0 && (
                        <Tooltip title="Average Rating" placement="top">
                            <Box display="flex" alignItems="center">
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mr: 0.25, color: yellow[800] }}
                                >
                                    {averageRating}
                                </Typography>
                                <Rating precision={0.1} value={averageRating} readOnly />
                            </Box>
                        </Tooltip>
                    )}
                </Box>
                <Button color="error" variant="contained" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewListFeedback
