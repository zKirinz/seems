import React, { useState } from 'react'

import Comment from '../../../components/Comment'
import { Box } from '@mui/material'

import ResponseComments from './ResponseComments'

const CommentSection = ({ onDeleteComment, editCommentHandler, comment }) => {
    const [openCommentField, setOpenCommentField] = useState(false)
    return (
        <React.Fragment>
            <Box>
                <Comment
                    onDeleteComment={onDeleteComment}
                    editCommentHandler={editCommentHandler}
                    {...comment}
                    setOpenResponseCommentField={setOpenCommentField}
                    openResponseCommentField={openCommentField}
                />
                <ResponseComments openResponseCommentField={openCommentField} />
            </Box>
        </React.Fragment>
    )
}

export default CommentSection
