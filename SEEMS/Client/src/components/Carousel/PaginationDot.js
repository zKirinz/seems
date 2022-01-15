import { Box, Button } from '@mui/material'

const PaginationDot = ({ onClick, index, active }) => {
    return (
        <Button
            type="button"
            sx={{
                minWidth: 28,
                cursor: 'pointer',
                background: 'none',
                border: 0,
                padding: 0,
            }}
            onClick={(event) => {
                onClick(event, index)
            }}
        >
            <Box
                sx={{
                    backgroundColor: (theme) => (active ? 'primary.main' : theme.palette.grey[400]),
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                }}
            />
        </Button>
    )
}

export default PaginationDot
