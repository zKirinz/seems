import { atom } from 'recoil'

const authAtom = atom({
    key: 'authAtom',
    default: { token: null, email: '', name: '', organization: '', image: '', role: '', exp: 0 },
})

export default authAtom
