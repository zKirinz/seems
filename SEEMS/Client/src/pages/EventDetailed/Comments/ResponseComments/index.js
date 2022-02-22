import React from 'react'

import ResponseComment from './ResponseComment'

const ResponseComments = ({ comments, editCommentHandler, onDeleteComment }) => {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <ResponseComment
                    key={comment.id}
                    comment={comment}
                    editCommentHandler={editCommentHandler}
                    onDeleteComment={onDeleteComment}
                />
            ))}
        </React.Fragment>
    )
}

export default ResponseComments
