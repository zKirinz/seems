import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const ViewListFeedBack = ({ open, onClose }) => {
    return (
        <Dialog scroll={'paper'} open={open} onBackdropClick={onClose}>
            <DialogTitle>View Feedbacks</DialogTitle>
            <DialogContent dividers></DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewListFeedBack
