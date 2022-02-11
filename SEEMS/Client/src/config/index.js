const config = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    APP_ROOT_URL: process.env.REACT_APP_ROOT_URL,
    APP_API_URL: process.env.REACT_APP_API_URL,
    LOCALSTORAGE_TOKEN_NAME: 'token',
}

export const { NODE_ENV, APP_ROOT_URL, APP_API_URL, LOCALSTORAGE_TOKEN_NAME } = config
