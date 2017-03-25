import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import {loadCommentsByArticleId} from '../AC'
import {connect} from 'react-redux'
import Loader from './Loader'

class CommentList extends Component {

    static propTypes = {
        article: PropTypes.object.isRequired
    }

    componentDidUpdate() {
        this.size = this.container.getBoundingClientRect()
    }

    componentWillReceiveProps({isOpen, loading, article, loadCommentsByArticleId, comments}) {
        if (!this.props.isOpen && isOpen && !comments.length && !loading) loadCommentsByArticleId(article.id)
     }

    render() {
        const {isOpen, toggleOpen} = this.props
//        console.log('---', this.size)
        return (
            <div ref={this.getContainerRef}>
                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
            </div>
        )
    }

    getContainerRef = (ref) => {
        this.container = ref
        if (ref) {
            this.size = ref.getBoundingClientRect()
        }
    }

    getBody() {
        const {article, isOpen, comments, error, loading} = this.props
        if (!isOpen) return null

        if (error) {
            return <h1>{error}</h1>
        }

        if (loading) {
            return <Loader />
        }
        if (!comments || !comments.length) {
            return <div>
                <h3>
                    No comments yet
                </h3>
                <NewCommentForm articleId={article.id} />
            </div>
        }

        const commentItems = comments.map(comment => <li key={comment.id}><Comment id={comment.id} user={comment.user} text={comment.text} /></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
                <NewCommentForm articleId={article.id} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {article} = props
    const commentsMap=state.comments.entities.get(article.id)
    return {
        comments: !commentsMap?[]:commentsMap.valueSeq().toJS(),
        loading: state.comments.loading,
        error: state.comments.error
    }
}

export default connect(mapStateToProps, { loadCommentsByArticleId })(toggleOpen(CommentList))