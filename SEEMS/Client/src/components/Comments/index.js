import React from 'react'

import Comment from './Comment'

const Comments = ({ comments, onDeleteComment, editCommentHandler }) => {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <Comment
                    {...comment}
                    key={comment.id}
                    onDeleteComment={onDeleteComment}
                    editCommentHandler={editCommentHandler}
                />
            ))}
        </React.Fragment>
    )
}

export default Comments
