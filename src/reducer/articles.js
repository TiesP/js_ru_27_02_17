import {DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ARTICLE_COMMENTS,
    SUCCESS, FAIL, START} from '../constants'
import {Record, Map} from 'immutable'
import {arrToMap} from './utils'

const ArticleModel = Record({
    id: null,
    date: null,
    title: null,
    text: null,
    loading: false,
    commentsLoaded: false,
    commentsLoading: false,
    comments: []
})

const DefaultReducerState = Record({
    entities: new Map({}),
    loading: false,
    error: null
})

export default (state = new DefaultReducerState(), action) => {
    const { type, payload, response, error, randomId } = action

    switch (type) {
        case DELETE_ARTICLE:
            return state.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return state.updateIn(['entities', payload.articleId, 'comments'], (comments) => comments.concat(randomId))

        case LOAD_ALL_ARTICLES + START:
            return state.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return state
                .mergeIn(['entities'], arrToMap(response, ArticleModel))
                .set('loading', false)

        case LOAD_ALL_ARTICLES + FAIL:
            return state
                .set('error', error.statusText)
                .set('loading', false)

        case LOAD_ARTICLE_BY_ID + START:
            return state.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE_BY_ID + SUCCESS:
            return state.setIn(['entities', payload.id], new ArticleModel(payload.response))

        case LOAD_ARTICLE_BY_ID + FAIL:
            return state.deleteIn(['entities', payload.id])

        case LOAD_ARTICLE_COMMENTS + START:
            return state.setIn(['entities', payload.articleId, 'commentsLoading'], true)

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state
                .setIn(['entities', payload.articleId, 'commentsLoading'], false)
                .setIn(['entities', payload.articleId, 'commentsLoaded'], true)
    }

    return state
}