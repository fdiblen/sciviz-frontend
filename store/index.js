import Vuex from 'vuex'

let store

const initStore = () => {
  return store || (store = new Vuex.Store({
    state: {
      widgets: [],
      data: [],
      vegaChartSpec: {
        "mark": "area",
        "encoding": {
          "x": {
            "field": "date",
            "type": "temporal",
          },
          "y": {
            "field": "price",
            "type": "quantitative",
          }
        }
      },
      vegaData: {
        "data": {
          "url": "https://raw.githubusercontent.com/johnmyleswhite/Vega.jl/master/vega-datasets/sp500.csv",
          "format": {
            "type": "csv"
          }
        }
      },
      vegaFilters: [],
      vegaCharts: {}
    },
    mutations: {
      addChart(state, payload) {
        console.log('Called state::addChart()')
        console.log('Payload:', payload)
        console.log(state)
        state.widgets.push(payload)
      },
      addChartFilter(state, payload) {
        console.log('Called state::addChartFilter()')
        console.log('Payload:', payload)
        console.log(state)
        state.vegaFilters.push(payload)
      },
      applyChartFilter(state, payload) {
        console.log('Called state::applyChartFilter()')
        console.log('Payload:', payload)
        console.log(state)

        console.log(JSON.stringify(state))


        console.log('Before filter: \n', state.widgets[1].chartSpec)
        // const index = state.data.findIndex(d => d.id === payload.widgetId);;
        state.widgets[1].chartSpec.encoding.x = {
          ...state.widgets[1].chartSpec.encoding.x,
          ...payload.newSelector
        }
        console.log('After filter: \n', state.widgets[1].chartSpec)
        // console.log(state.widgets[index].chartSpec.encoding.x)
        // state.vegaFilters.push(payload)
        console.log(state)
      },
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
        const index = state.data.findIndex(d => d.id === payload);;
        state.data.splice(index, 1)
      }
    },
    getters: {
      widgets(state) {
        return state.widgets
      },
      data(state) {
        return state.data
      },
      vegaSpec(state) {
        return { ...state.vegaData, ...state.vegaChartSpec, ...state.vegaFilter }
      },
      vegaFilters(state) {
        return state.vegaFilters
      },
      numberOfWidgets(state) {
        if (state.widgets) {
          return state.widgets.length
        }
        else {
          return 0
        }
      },
      numberOfDatasets(state) {
        if (state.data) {
          return state.data.length
        }
        else {
          return 0
        }
      },
      numberOfVegaFilters(state) {
        if (state.vegaFilters) {
          return state.vegaFilters.length
        }
        else {
          return 0
        }
      }
    }
  })
  )
}

export default initStore

