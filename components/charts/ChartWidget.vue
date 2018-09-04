<template>
    <div>
    
        <v-card :height="height" :width="width" @resize="resizeCardEvent">
            <v-toolbar color="secondary" height="50px" dark class="vue-draggable-handle">
                <v-icon>{{type}}</v-icon>
    
                <v-toolbar-title>Chart {{title}}</v-toolbar-title>
    
                <v-spacer></v-spacer>
    
    
                <!-- menu button -->
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
                    <v-btn slot="activator" color="primary" dark icon>
                        <v-badge v-if="numSelectedVariables == 0" color="red">
                            <span slot="badge">!</span>
                            <v-icon>more_vert</v-icon>
                        </v-badge>
                        <v-icon v-else>more_vert</v-icon>
    
                    </v-btn>
    
    
                    <!-- menu when the more button is clicked -->
                    <v-card width="250">
                        <v-list v-if="numSelectedVariables == 0">
                            <v-list-tile>
    
                                <v-list-tile-action>
                                    <v-icon color="red">warning</v-icon>
                                </v-list-tile-action>
    
                                <v-list-tile-content>
                                    <v-list-tile-title small>No variables selected!</v-list-tile-title>
                                </v-list-tile-content>
    
                            </v-list-tile>
                        </v-list>
    
                        <v-divider></v-divider>
    
                        <v-list-tile>
    
                            <v-list-tile-content>
    
                                <!-- variable selection -->
                                <v-combobox height="50px" v-model="selectedVariables" 
                                            :items="variableOptions" label="X-axis" 
                                            clearable prepend-icon="filter_list"
                                            solo :multiple="false" 
                                            @change="variableSelected">
                                    <template slot="selection" slot-scope="data">
                                        <v-chip
                                            :selected="data.selected"
                                            close
                                            @input="removeVariableChip(data.item)"
                                        >

                                        </v-chip>
                                    </template>
                                </v-combobox>

                    </v-list-tile-content>
                  </v-list-tile>



                <v-divider></v-divider>

                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Edit</v-list-tile-title>
                    <v-list-tile-action>
                      <v-btn icon @click.stop="showEditChartDialog = true">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile>
                    <v-list-tile-title>Delete</v-list-tile-title>
                    <v-list-tile-action>
                      <v-btn icon @click="onClickDelete">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile>
                    <v-list-tile-title>Save</v-list-tile-title>
                    <v-list-tile-action>
                      <v-btn icon @click="onClickSave">
                        <v-icon>save_alt</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider></v-divider>                  

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="resize" color="primary"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable Resizing</v-list-tile-title>
                  </v-list-tile>

                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn flat @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>

        </v-toolbar>


          <chart-base-vega
          :width="canvasWidth"
          :height="canvasHeight"/>


          <edit-chart :visible="showEditChartDialog" @close="showEditChartDialog = false"></edit-chart>
      </v-card>

</div>
</template>

<script>
import EditChart from '~/components/charts/EditChart'
import ChartBaseVega from '~/components/charts/vega/ChartBaseVega'

export default {
    name: 'Chart',
    props: ['type', 'id', 'title', 'width', 'height'],
    components: {
        EditChart,
        ChartBaseVega
    },
    data() {
        return {
            menu: false,
            resize: true,
            selectedVariables: [],
            variableOptions: ['dataX', 'dataY', 'dataZ'],
            showEditChartDialog: false
        }
    },
    created() {
        console.log('called chartWidget::created()')
    },
    beforeMount() {
        console.log('called chartWidget::beforeMount()')
    },
    mounted() {
        console.log('called chartWidget::mounted()')
        console.log(this.selectedVariables.length)
    },
    computed: {
        numSelectedVariables() {
            return this.selectedVariables.length
        },
        canvasWidth() {
            return this.width * 0.8
        },
        canvasHeight() {
            return this.height * 0.8
        }


    },
    methods: {
        onClick() {
            console.log('called onClick()')
        },
        onChartMenu() {
            console.log('called onChartMenu()')
        },
        resizeCardEvent() {
            console.log('called resizeCardEvent()')
        },
        onClickDelete(event) {
            console.log('called onClickDelete()')
            console.log('chart id', this.id)
            this.$emit('onClickDelete', 'someValue', this.id)
        },
        onClickEdit() {
            console.log('called onClickEdit()')
            console.log('chart id', this.id)
            this.$emit('onClickEdit', 'someValue', this.id)
        },
        onClickSave() {
            console.log('called onClickSave()')
            console.log('chart id', this.id)
            this.$emit('onClickSave', 'someValue', this.id)
        },
        onClickSpeedDialDelete() {
            console.log('called onClickSpeedDialDelete()')
            this.$emit('onClickDelete', 'someValue', this.id)
        },
        onClickSpeedDialEdit() {
            console.log('called onClickSpeedDialEdit()')
            this.$emit('onClickEdit', 'someValue', this.id)
        },
        removeVariableChip(item) {
            console.log('called removeVariableChip()')
            this.selectedVariables.splice(this.selectedVariables.indexOf(item), 1)
            this.selectedVariables = [...this.selectedVariables]
        },
        variableSelected(item) {
            console.log('called variableSelected()')
            console.log(item)
        }
    }
}
</script>

<style scoped>
#create .v-speed-dial {
    position: absolute;
}

#create .v-btn--floating {
    position: relative;
}

.vue-resizable-handle {}
</style>