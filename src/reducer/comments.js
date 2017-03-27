import {normalizedComments} from '../fixtures'
import { ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLE_ID, SUCCESS, FAIL, START} from '../constants'
import {arrToMap} from './utils'
import {Record, Map} from 'immutable'

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
})

const DefaultReducerState = Record({
    entities: new Map({}),
    //здесь так просто уже не выйдет, ведь ты загружаешь не все комменты сразу, а отдельно для каждой статьи
    loading: false,
    error: null
})

export default (comments = new DefaultReducerState(), action) => {
    const { type, payload, randomId, error} = action

    switch (type) {
        case LOAD_COMMENTS_BY_ARTICLE_ID + START:
            return comments
                .set('loading', true)

        case LOAD_COMMENTS_BY_ARTICLE_ID + SUCCESS:
            return comments
                //давай комменты хранить в такой же структуре, как и статьи. Иначе быстро запутаешься
                .setIn(['entities', payload.articleId], arrToMap(payload.response, CommentModel))
                .set('loading', false)

        case LOAD_COMMENTS_BY_ARTICLE_ID + FAIL:
            return comments
                .set('error', error.statusText)
                .set('loading', false)

        case ADD_COMMENT:
            return comments
                .setIn(['entities', payload.articleId, randomId], new CommentModel({id: randomId, ...payload.comment}))
                .set('loading', false)
}

return comments
}
