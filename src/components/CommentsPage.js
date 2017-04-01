import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Comment from './Comment'
import Loader from './Loader'
import {loadCommentsForPage} from '../AC'

class CommentsPage extends Component {

    componentWillMount() {
        this.checkAndLoad(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.checkAndLoad(nextProps)
    }

    checkAndLoad({ loading, comments, match, loadCommentsForPage }) {
        if (!comments && !loading) loadCommentsForPage(match.params.page)
    }

    render() {
        const {total} = this.props
        if (!total) return <Loader/>
        return (
            <div>
                {this.getCommentItems()}
                {this.getPaginator()}
            </div>
        )
    }

    getCommentItems() {
        const {comments, loading} = this.props
        if (loading || !comments) return <Loader />
        const commentItems = comments.map(id => <li key={id}><Comment id={id}/></li>)
        return <ul>{commentItems}</ul>
    }

    getPaginator() {
        const {total} = this.props
        const items = []
        for (let i = 1; i <= Math.floor((total - 1) / 5) + 1; i++) {
            items.push(<li key={i}><NavLink to={`/comments/${i}`} activeClassName="active">{i}</NavLink></li>)
        }
        return <ul>{items}</ul>
    }
}

CommentsPage.propTypes = {
}

export default connect((state, { match }) => {
    const {total, pagination} = state.comments
    return {
        total,
        loading: pagination.getIn([match.params.page, 'loading']),
        comments: pagination.getIn([match.params.page, 'ids'])
    }
}, { loadCommentsForPage })(CommentsPage)