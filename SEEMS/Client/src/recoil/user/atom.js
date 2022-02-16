import { atom } from 'recoil'

const userAtom = atom({
    key: 'userAtom',
    default: { email: '', username: '', image: '', role: '' },
})

export default userAtom
