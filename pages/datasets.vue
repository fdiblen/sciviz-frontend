<template>
<div>

  <v-layout>
    <v-flex xs12>

      <v-card v-if="numberOfDatasets == 0">
                <v-alert
                :value="true"
                color="error"
                icon="new_releases"
                class="headline"
                >
                No datasets were found!
                </v-alert>
      </v-card>

      <v-card v-else>

        <v-card-actions>
          <!-- <v-select :items="items" v-model="size" label="Size"></v-select> -->
          <!-- <v-spacer></v-spacer> -->
        </v-card-actions>
        <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for="dataset in datasets"
              :key="dataset.id"
              xs4
            >


      <v-card flat tile>
        <v-card-media
          :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
          height="200px"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{dataset.name}}</h3>
            <div>data url: {{dataset.url}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <!-- <v-btn flat color="primary">Share</v-btn> -->
          <v-btn flat color="primary">Explore</v-btn>
          <v-switch @change="toggledataset(dataset.id)" color="primary" label="Enable">
          </v-switch>
        <span>Enable</span>
        <v-btn flat color="primary" label="Remove">
            <v-icon @click="removedataset(dataset.id)">delete</v-icon>
        </v-btn>

        </v-card-actions>
      </v-card>




            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

</div>
</template>

<script>

  import store from '~/store/index'

  export default {
    components: {
    },
    data () {
      return {
        size: 'sm',
        items: [
            { text: 'Extra small (2px)', value: 'xs' },
            { text: 'Small (4px)', value: 'sm' },
            { text: 'Medium (8px)', value: 'md' },
            { text: 'Large (16px)', value: 'lg' },
            { text: 'Extra large (24px)', value: 'xl' }
        ]
      }
    },
    computed: {
      datasets () {
        return this.$store.getters.data
      },
      numberOfDatasets () {
          return this.$store.getters.data.length
      }

    },
    methods: {
        toggledataset(id) {
            console.log('called Datasets::toggledataset()')
            this.$store.commit('toggledataset', id)
        },
        removedataset(id) {
            console.log('called Datasets::removedataset()')
            this.$store.commit('removedataset', id)
        }        
    }
  }
</script>
