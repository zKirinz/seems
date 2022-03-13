import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import ListFeedback from './ListFeedback'

const feedbacks = [
    {
        rating: 3,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
    },
    {
        rating: 3,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
    },
    {
        rating: 3,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
    },
]

const ViewListFeedback = ({ open, onClose }) => {
    return (
        <Dialog scroll={'paper'} open={open} onBackdropClick={onClose}>
            <DialogTitle>View Feedbacks</DialogTitle>
            <DialogContent dividers>
                <ListFeedback feedbacks={feedbacks} />
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
