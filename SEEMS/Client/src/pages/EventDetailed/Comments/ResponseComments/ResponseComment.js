import React from 'react'

import Comment from '../../../../components/Comment'

const ResponseComment = ({ comment, editCommentHandler, onDeleteComment, reactCommentHandler }) => {
    return (
        <Comment
            {...comment}
            editCommentHandler={editCommentHandler}
            onDeleteComment={onDeleteComment}
            reactCommentHandler={reactCommentHandler}
        />
    )
}
export default ResponseComment
