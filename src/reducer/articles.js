import {normalizedArticles} from '../fixtures'
import {DELETE_ARTICLE, ADD_COMMENT} from '../constants'

export default (state = normalizedArticles, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            return state.filter(article => article.id !== payload.id)
        case ADD_COMMENT:
            const { id } = action
            return state.map(article => {
                if(article.id == payload.articleId) {
                    //article.comments.concat(id)
                    //здесь ты мутируешь стейт. Возвращаешь новый массив, но внутри меняешь объекты по ссылке
                    article.comments.push(id)
                }
                return article
                })
    }

    return state
}

