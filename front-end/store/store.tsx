import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import epicMiddleware, { rootEpic } from './epics'
import rootReducer, { initialState } from './reducers'

const composeEnhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({
        name: 'WebsiteVB',
      })
    : null

const store = createStore(
  rootReducer,
  initialState,
  process.env.NODE_ENV === 'development' ? composeEnhancer(applyMiddleware(epicMiddleware)) : applyMiddleware(epicMiddleware)
)

epicMiddleware.run(rootEpic)

export default store
