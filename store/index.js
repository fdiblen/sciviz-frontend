import Vuex from 'vuex'

let store

const initStore = () => {
    return store || (store = new Vuex.Store({
        state: {
            widgets: [],
            data: []
        },
        mutations: {
            addDataset(state, payload) {
                console.log('Called state::addDataset()')
                console.log('Payload:', payload)
                console.log(state)
                state.data.push(payload)
            },
            toggledataset(state, payload) {
                console.log('Called state::toggledataset()')
                console.log('Payload:', payload)
                state.data = state.data.map(d => {
                    if (d.id === payload) {
                        return { id: d.id, name: d.name, url: d.url, enabled: !d.enabled }
                    }
                    return d;
                })
            },
            removedataset(state, payload) {
                console.log('Called state::removedataset()')
                console.log('Payload:', payload)
                const index = state.data.findIndex(d => d.id === payload);
                state.data.splice(index, 1)
            }
        },
        getters: {
            widgets(state) {
                return state.widgets
            },
            data(state) {
                return state.data
            }
        }
    })
    )
}

export default initStore

