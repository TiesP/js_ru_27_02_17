import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer/index'
import logger from '../middlewares/logger'
import newCommentId from '../middlewares/newCommentId'

const enhancer = applyMiddleware(logger, newCommentId)

const store = createStore(reducer, {}, enhancer)

//dev only
window.store = store

export default store