import React from 'react'

import Comment from '../../../../components/Comment'

const ResponseComment = ({
    comment,
    editCommentHandler,
    onDeleteComment,
    reactCommentHandler,
    canLike,
}) => {
    return (
        <Comment
            {...comment}
            editCommentHandler={editCommentHandler}
            onDeleteComment={onDeleteComment}
            reactCommentHandler={reactCommentHandler}
            canLike={canLike}
        />
    )
}
export default ResponseComment
