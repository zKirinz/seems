import React from 'react'

import ResponseComment from './ResponseComment'

const ResponseComments = ({
    comments,
    editCommentHandler,
    onDeleteComment,
    reactCommentHandler,
}) => {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <ResponseComment
                    key={comment.id}
                    comment={comment}
                    editCommentHandler={editCommentHandler}
                    onDeleteComment={onDeleteComment}
                    reactCommentHandler={reactCommentHandler}
                />
            ))}
        </React.Fragment>
    )
}

export default ResponseComments
