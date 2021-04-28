import { createStore } from 'redux';
import handleAuth from './Reducers/authReducer'

export default createStore(handleAuth)