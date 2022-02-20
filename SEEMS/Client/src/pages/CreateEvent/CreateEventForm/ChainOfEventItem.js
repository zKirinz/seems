import { Close } from '@mui/icons-material'
import { IconButton, MenuItem } from '@mui/material'

const ChainOfEventItem = ({ id, categoryName, openDialog, chooseChainOfEventHandler }) => {
    return (
        <MenuItem
            value={categoryName}
            onClick={() => chooseChainOfEventHandler(id, categoryName)}
            sx={{ position: 'relative' }}
        >
            {categoryName}
            <IconButton
                sx={{ position: 'absolute', right: 5 }}
                onClick={(event) => openDialog(event, id)}
            >
                <Close />
            </IconButton>
        </MenuItem>
    )
}
export default ChainOfEventItem
