import { useEffect } from 'react'

import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import { LOCALSTORAGE_TOKEN_NAME } from '../../config'
import { post } from '../../utils/ApiCaller'
import usePersistedState from '../../utils/usePersistedState'

const Auth = () => {
    const history = useHistory()
    const { search } = useLocation()
    const { token, error } = queryString.parse(search)
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [user, setUser] = usePersistedState(LOCALSTORAGE_TOKEN_NAME, '')

    const verifyToken = async () => {
        try {
            const response = await post('/api/authentication/auth', {}, {}, { token: token })

            if (response?.data?.status) {
                setUser(token)
                history.push('/')
            }
        } catch (error) {
            history.push('/login?error=unexpected')
        }
    }

    useEffect(() => {
        if (error) {
            history.push('/login?error=fpt-email-invalid')
        } else {
            verifyToken()
        }
    })

    return (
        <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
            {token}
        </Box>
    )
}

export default Auth
