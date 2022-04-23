import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({
        name: 'WebsiteVB',
      })
    : null

const store = {}

export default store
