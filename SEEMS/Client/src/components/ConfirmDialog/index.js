import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { blue } from '@mui/material/colors'

const AlertConfirm = ({ title, children, open, onConfirm, onClose, btnConfirmText }) => {
    return (
        <Dialog open={open} onClose={onClose} onBackdropClick={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: blue[600] }}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} autoFocus sx={{ color: blue[600] }}>
                    {btnConfirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertConfirm
