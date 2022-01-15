import { Box } from '@mui/material'

import PaginationDot from './PaginationDot'

const Pagination = ({ onChangeIndex, index, dots }) => {
    const children = []

    for (let i = 0; i < dots; i += 1) {
        children.push(
            <PaginationDot
                key={i}
                index={i}
                active={i === index}
                onClick={(_, index) => {
                    onChangeIndex(index)
                }}
            />
        )
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 24,
                right: 16,
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {children}
        </Box>
    )
}

export default Pagination
