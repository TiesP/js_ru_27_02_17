import {INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT, LOAD_COMMENTS_FOR_PAGE,
    LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ARTICLE_COMMENTS, START, SUCCESS, FAIL} from '../constants'
import $ from 'jquery'
import {push, replace} from 'react-router-redux'

export function increment() {
    const action = {
        type: INCREMENT
    }

    return action
}


export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function checkAndLoadArticleComments(articleId) {
    return (dispatch, getState) => {
        const article = getState().articles.getIn(['entities', articleId])
        if (article.commentsLoaded || article.commentsLoading) return

        dispatch({
            type: LOAD_ARTICLE_COMMENTS + START,
            payload: { articleId }
        })

        setTimeout(() => {
            $.get(`/api/comment?article=${articleId}`)
                .done(response => dispatch({
                    type: LOAD_ARTICLE_COMMENTS + SUCCESS,
                    payload: { response, articleId }
                }))
                .fail(error => dispatch({
                    type: LOAD_ARTICLE_COMMENTS + FAIL,
                    payload: { error, articleId }
                }))
        }, 1000)
    }
}

export function loadArticleById(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE_BY_ID + START,
            payload: { id }
        })

        setTimeout(() => {
            $.get(`/api/article/${id}`)
                .done(response => dispatch({
                    type: LOAD_ARTICLE_BY_ID + SUCCESS,
                    payload: { response, id }
                }))
                .fail(error => {
                    dispatch({
                        type: LOAD_ARTICLE_BY_ID + FAIL,
                        payload: { error, id }
                    })

                    dispatch(replace('/articles'))
                })
        }, 1000)
    }
}

export function loadCommentsForPage(page) {
    return {
        type: LOAD_COMMENTS_FOR_PAGE,
        payload: { page },
        callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
    }
}