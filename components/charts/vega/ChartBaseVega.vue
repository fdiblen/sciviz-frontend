<template>
    <div>
    
        <!-- <vega-lite 
       :spec='spec'
       :autoResize='autoResize'
       :width='width'
       :height='height'
       :data='values' 
       mark='circle' 
       :encoding='encoding'
       @click='onChartClick'
       /> -->
    
        <vega-lite :spec='spec' :width='width' :height='height' autoResize='true' :padding='padding' @click='onChartClick' @signal:pointer_tuple='onPointer' />
    
    
        <!-- <Interactive @click='displaySelection'
         :width='width'
       :height='height'></Interactive> -->
    
        <!-- <div><span>Origin : {{origin}}</span></div>
      <div><span>Cylinders : {{cylinders}}</span></div>
      <div><span>Records : {{records}}</span></div> -->
    
        <!-- VegaChart dimensions: {{width}} {{height}} <br/> -->
    </div>
</template>


<script>
import { mapVegaLiteSpec } from 'vue-vega'

// import VueVega from 'vue-vega'
// import Interactive from './interactive.vl.json'


export default {
    name: 'ChartBaseVega',
    props: ['width', 'height'],
    components: {
        //  Interactive: VueVega.mapVegaLiteSpec(Interactive)
    },
    data() {
        return {
            padding: {
                'top': 0,
                'left': 0,
                'bottom': 0,
                'right': 0
            },
            spec: {
                'data': {
                    'url': 'https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json',
                    'format': {
                        'type': 'json'
                    }
                },
                'mark': 'point',
                'encoding': {
                    'x': {
                        'bin': { 'maxbins': 15 },
                        'field': 'Horsepower',
                        'type': 'quantitative'
                    },
                    'y': {
                        'aggregate': 'count',
                        'type': 'quantitative'
                    }
                },
                'selection': {
                    'brush': {
                        'type': 'interval'
                    }
                }
            }
        }
    },
    created() {
        console.log('called ChartBaseVega::created()')
    },
    beforeMount() {
        console.log('called ChartBaseVega::beforeMount()')
    },
    mounted() {
        console.log('called ChartBaseVega::mounted()')
    },
    methods: {
        onChartClick(event, item) {
            if (item && item.datum) {
                console.log('called onChartClick()')
                // console.log(event)
                // console.log(item)
                console.log(item.datum)
            }
        },
        displaySelection(event, item) {
            if (item && item.datum) {
                let datum = item.datum

                this.origin = datum.Origin
                this.cylinders = datum.Cylinders
                this.records = datum['count_*']
            }
        },
        onPointer(tuple) {
            if (tuple && tuple.fields) {
                this.field = tuple.fields[1]
                this.value = tuple.values[1]
            }
        }
    }
}
</script>