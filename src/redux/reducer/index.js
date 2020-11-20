import { combineReducers } from 'redux';
import gamereducer from './reducer'

export default combineReducers({
    game: gamereducer
})