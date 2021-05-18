import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk))
}

const store = configureStore
export default store
