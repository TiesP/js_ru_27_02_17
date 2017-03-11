import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.array
    }

    static defaultProps = {
        comments: []
    }

    state = {
        name: '',
        comment: ''
    }

    componentDidUpdate() {
        this.size = this.container.getBoundingClientRect()
    }

    render() {
        const {isOpen, toggleOpen} = this.props
//        console.log('---', this.size)
        return (
            <div ref={this.getContainerRef}>

                <form method="post">
                    <br/>
                    <b>New comment:</b><br/>
                    <textarea rows="3" value={this.state.comment} onChange={this.handleCommentChange}/>
                    <br/>
                    <label>Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                </form>

                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
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

    getContainerRef = (ref) => {
        this.container = ref
        if (ref) {
            this.size = ref.getBoundingClientRect()
        }
    }

    getBody() {
        const {comments, isOpen} = this.props
        if (!isOpen) return null

        if (!comments.length) {
            return <div>
                <h3>
                    No comments yet
                </h3>
            </div>
        }

        const commentItems = comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
            </div>
        )
    }
}

export default toggleOpen(CommentList)
