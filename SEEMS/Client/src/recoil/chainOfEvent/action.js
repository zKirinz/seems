import { get, post } from '../../utils/ApiCaller'

const useChainOfEventAction = () => {
    const createChainOfEvent = (chainOfEventData) =>
        post({ endpoint: '/api/chainOfEvent', body: chainOfEventData })

    const getListChainOfEvent = () => {
        return get({ endpoint: '/api/chainOfEvent' })
    }
    return {
        createChainOfEvent,
        getListChainOfEvent,
    }
}

export default useChainOfEventAction
