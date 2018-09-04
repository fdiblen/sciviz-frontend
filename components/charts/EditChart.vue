<template>
    <v-layout row justify-center>
        <v-dialog v-model="showDialog" persistent max-width="500px">
    
            <v-card>
                <v-card-title>
                    <span class="headline">Chart settings</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Chart name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Chart title" hint="example of helper text only on focus"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="X-title" hint="Latex syntax will be supported" persistent-hint required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Y-title" hint="Latex syntax will be supported" persistent-hint required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select :items="['Linear', 'Logarithmic']" label="Scale" required></v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-autocomplete :items="['Option1', 'Option2', 'Option3']" label="Extra option" multiple chips></v-autocomplete>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.stop="showDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.stop="showDialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>
export default {
    name: 'EditChart',
    props: ['visible', 'type', 'id'],
    components: {},
    data() {
        return {}
    },
    computed: {
        showDialog: {
            get() {
                return this.visible
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }
}
</script>