import React from 'react'

import Comment from './Comment'

const Comments = ({ comments, onDeleteComment }) => {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <Comment {...comment} key={comment.id} onDeleteComment={onDeleteComment} />
            ))}
        </React.Fragment>
    )
}

export default Comments
