import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
})

export default authSlice.reducer
