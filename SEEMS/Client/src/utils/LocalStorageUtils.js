import jwt_decode from 'jwt-decode'

import { LOCALSTORAGE_TOKEN_NAME } from '../config'

class LocalStorageUtils {
    getItem(key) {
        if (typeof localStorage !== 'undefined') {
            let item = localStorage.getItem(key)
            if (!item) {
                this.setItem(key)
                return localStorage.getItem(key)
            }
            return JSON.parse(item || '{}')
        }
        return undefined
    }

    setItem(key, value = '') {
        if (typeof localStorage !== 'undefined' && value !== '') {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    removeItem(key) {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key)
        }
    }

    clear() {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear()
        }
    }

    getUser() {
        if (typeof localStorage !== 'undefined') {
            const token = this.getItem(LOCALSTORAGE_TOKEN_NAME)
            try {
                if (token) return jwt_decode(token)
                else return token
            } catch (error) {
                return token
            }
        }
        return undefined
    }

    setUser(token) {
        if (typeof localStorage !== 'undefined') {
            this.setItem(LOCALSTORAGE_TOKEN_NAME, token)
            this.setItem('user', JSON.stringify(jwt_decode(token)))
        }
        return undefined
    }

    getToken() {
        return this.getItem(LOCALSTORAGE_TOKEN_NAME)
    }
}

export default new LocalStorageUtils()
