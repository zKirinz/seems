import counterReducer from './features/counter/counterSlice'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})
