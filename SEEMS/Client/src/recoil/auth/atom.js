import { atom } from 'recoil'

const authAtom = atom({
    key: 'authAtom',
    default: { token: null, userId: null, error: null, loading: false, authRedirectPath: '/' },
})

export default authAtom
