import React, {PropTypes}  from 'react'

function Comment(props) {
    const { text, user } = props
    return (
        <div>
            <p>{text} <b>by {user}</b></p>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.string
    })
}

export default Comment
