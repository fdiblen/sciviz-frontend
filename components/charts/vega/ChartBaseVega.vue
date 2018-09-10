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



        <vega-lite
            :spec='spec'
            :width='width'
            :height='height'
            :autoResize='true'
            :padding='padding'
            @click='onChartClick'
            @signal:pointer_tuple='onPointer'
            @signal:tooltip='onTooltipSignal'
        />

        <!-- VegaChart dimensions: {{width}} {{height}} <br/> -->
    </div>
</template>


<script>
import { mapVegaLiteSpec } from 'vue-vega'
import store from '@/store'

import * as vega from 'vega-lite'
import * as vegaTest from 'vue-vega'


export default {
    name: 'ChartBaseVega',
    props: ['width', 'height', 'spec'],
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
            }
            // ,spec: this.$store.getters.vegaSpec
        }
    },
    created() {
        console.log('called ChartBaseVega::created()')
        //console.log('vega signals:');
        //console.log(this.vegaSpec.signals);
        // https://groups.google.com/forum/#!topic/vega-js/15oEfTfq5aI

        console.log('Vega modules: \n')
        console.log(vega)
        console.log(vegaTest)


// https://bl.ocks.org/timelyportfolio
// https://bl.ocks.org/timelyportfolio/7ea26d32a7534e4064df16cbf7abaa58

        // var view = new vega.View(vega.parse(this.spec))
        //   .renderer('canvas')  // set renderer (canvas or svg)
        //   // .initialize('#example-row-vega') // initialize view within parent DOM container
        //   // .hover()             // enable hover encode set processing
        //   // .run();              // run the dataflow and render the view

        // console.log('view: \n',view)


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
        },
        onTooltipSignal(signalName, signalValue) {
            console.log("signalValue: " + JSON.stringify(signalValue));
        //  vegaView1.signal("tooltip", signalValue).update();

        }
    }
}
</script>
