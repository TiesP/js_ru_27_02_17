import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    const { type } = action
    switch (type) {
    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
        case ADD_COMMENT:
            next({...action, id: newId(store.getState())})
     }
}

const newId = (state) => {
    return state.comments.reduce(function(max, current) {
        return Math.max(max, current.id);
    }, 0)+1;
 }
