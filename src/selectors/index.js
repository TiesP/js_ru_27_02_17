import {createSelector} from 'reselect'

export const getArticles = state => state.articles.entities
export const getFilters = state => state.filters
export const getComments = state => state.comments.entities
export const getId = (state, props) => props.id

export const filteredArticlesSelector = createSelector(getArticles, getFilters, getFilteredArticles)

export const createFindCommentSelector = () => createSelector(getComments, getId,
    (comments, id) => {
        return comments.get(id)
    }
)

export const articleByIdSelector = createSelector(getArticles, getId, (entities, id) => entities.get(id))

function getFilteredArticles(articles, filters) {
    const { selected, dateRange: { from, to } } = filters

    return articles.valueSeq().toArray().filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
}