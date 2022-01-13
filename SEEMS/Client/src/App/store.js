import authReducer from '../features/auth/authSlice'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        auth: authReducer,
    },
})
