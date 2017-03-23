import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    const { type } = action
    switch (type) {
        case ADD_COMMENT:
            next({...action, id: newId(store.getState())})
            break
        default :
            next(action)
     }
}

const newId = (state) => {
    return state.comments.reduce(function(max, current) {
        return Math.max(max, current.id);
    }, 0)+1;
 }