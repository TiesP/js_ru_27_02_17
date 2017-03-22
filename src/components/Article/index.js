import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from '../CommentList'
import CSSTransition from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import {deleteArticle} from '../../AC'
import './style.css'

class Article extends Component {
    /*
     shouldComponentUpdate(nextProps, nextState) {
     return nextProps.isOpen !== this.props.isOpen
     }

     */
    render() {
        const {article, isOpen, toggleOpen} = this.props
        const body = isOpen
            ? <section>
                {article.text}
                <CommentList comments={article.comments} articleId={article.id} ref={this.getCommentList}/>
            </section>
            : null
        return (
            <div>
                <h3 onClick={toggleOpen}>{article.title}</h3>
                <a href="#" onClick={this.handleDelete}>delete me</a>
                <CSSTransition
                    transitionName="article"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {body}
                </CSSTransition>
            </div>
        )
    }

    handleDelete = ev => {
        ev.preventDefault()
        const {article, deleteArticle} = this.props
        deleteArticle(article.id)
    }

    getCommentList = ref => {
        this.commentList = ref
    }

    componentDidUpdate() {
//        console.log('---', findDOMNode(this.commentList))
    }
}


Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
        comments: PropTypes.array
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
}

export default connect(null, { deleteArticle })(Article)