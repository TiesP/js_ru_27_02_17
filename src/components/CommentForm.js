import React, { Component, PropTypes } from 'react'

class CommentForm extends Component {

    state = {
        name: '',
        comment: ''
    }


    render() {
         return (
            <div>

                <form method="post">
                    <br/>
                    <b>New comment:</b><br/>
                    <textarea rows="3" value={this.state.comment} onChange={this.handleCommentChange}/>
                    <br/>
                    <label>Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                </form>

            </div>
        )
    }

    handleNameChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            name: ev.target.value
        })
    }

    handleCommentChange = ev => {
        if (ev.target.value.length > 150) return

        this.setState({
            comment: ev.target.value
        })
    }

}

export default CommentForm
