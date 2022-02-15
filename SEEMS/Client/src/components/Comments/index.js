import React from 'react'

import Comment from './Comment'

const Comments = ({ comments }) => {
    return (
        <React.Fragment>
            {comments.map((comment) => (
                <Comment {...comment} key={comment.id} />
            ))}
        </React.Fragment>
    )
}

export default Comments
