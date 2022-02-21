import { get, post, remove } from '../../utils/ApiCaller'

const useChainOfEventAction = () => {
    const createChainOfEvent = (chainOfEventData) =>
        post({ endpoint: '/api/chainOfEvent', body: chainOfEventData })

    const getListChainOfEvent = () => {
        return get({ endpoint: '/api/chainOfEvent' })
    }
    const removeChainOfEvent = (id) => remove({ endpoint: `/api/chainOfEvent/${id}` })
    return {
        createChainOfEvent,
        getListChainOfEvent,
        removeChainOfEvent,
    }
}

export default useChainOfEventAction
