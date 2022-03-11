import React, { useState } from 'react'

import { RateReview } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'

import CreateFeedBack from './CreateFeedBack'

const FeedBack = () => {
    const [open, setOpen] = useState(false)

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }
    return (
        <React.Fragment>
            <Fab
                color="primary"
                sx={{ position: 'absolute', bottom: 100, right: 50 }}
                onClick={openHandler}
            >
                <Tooltip title="Feedback">
                    <RateReview />
                </Tooltip>
            </Fab>
            <CreateFeedBack open={open} onClose={closeHandler} />
        </React.Fragment>
    )
}

export default FeedBack
