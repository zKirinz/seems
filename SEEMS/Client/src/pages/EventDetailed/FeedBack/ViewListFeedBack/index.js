import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

import { useSnackbar } from '../../../../HOCs/SnackbarContext'
import ListFeedback from './ListFeedback'

// const feedback = [
//     {
//         id: 1,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 2,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 3,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 4,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 5,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ddddddddddddds
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 6,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
//     {
//         id: 7,
//         rating: 3,
//         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
//     },
// ]

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

    useEffect(() => {
        setIsLoading(true)
        getFeedbacksOfEvent(eventId)
            .then((response) => {
                console.log(response)
                const feedbacksData = response.data.data.listFeedBacks
                const rating = response.data.data.averageRating

                setFeedbacks(feedbacksData)
                setAverageRating(rating)
                setIsLoading(false)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Dialog scroll={'paper'} open={open} onBackdropClick={onClose}>
            <DialogTitle>View Feedbacks</DialogTitle>
            <DialogContent dividers id="scrollableTarget" sx={{ minWidth: 500 }}>
                {isLoading && <Loading />}
                <ListFeedback feedbacks={feedbacks} averageRating={averageRating} />
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewListFeedback
