import React from 'react'

import Comment from '../../../../components/Comment'

const ResponseComment = ({ comment, editCommentHandler, onDeleteComment }) => {
    return (
        <Comment
            {...comment}
            editCommentHandler={editCommentHandler}
            onDeleteComment={onDeleteComment}
        />
    )
}
export default ResponseComment
