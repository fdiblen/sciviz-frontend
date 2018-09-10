<template>
  <v-app :dark="darkTheme">

    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >

      <v-list>


        <v-list-tile class="mb-0">

            <v-btn
              v-if="drawer"
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>

          <v-list-tile-content>

          </v-list-tile-content>
        </v-list-tile>


        <v-list-tile class="mb-5 mt-1">

          <v-list-tile-content>

            <a href="https://www.esciencecenter.nl/"
            target="_blank" rel="noopener noreferrer"
            >
              <img class="nlesc-logo"
                height="50px"
                src="~/assets/images/nlesc_logo.jpg"
              >
            </a>
          </v-list-tile-content>

        </v-list-tile>






        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
          class="primary--text"
          active-class="blue--text"
        >
          <v-list-tile-action>




            <span v-if="miniVariant"> <!-- mini variant -->

                <span v-if="item.icon == 'dashboard'"> <!-- dashboard -->
                    <v-badge small v-if="numberOfTotalDatasets !== 0" color="green">
                        <span slot="badge">{{numberOfTotalDatasets}}</span>
                        <v-icon x-large v-html="item.icon"></v-icon>
                    </v-badge>
                    <v-icon v-else x-large v-html="item.icon"></v-icon>
                </span> <!-- dashboard -->

                <span v-else>
                    <v-icon x-large v-html="item.icon"></v-icon>
                </span>
            </span> <!-- mini variant -->

            <span v-else> <!-- full drawer -->
                <v-icon v-html="item.icon"></v-icon>
            </span> <!-- full drawer -->


          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>


    <v-bottom-nav
      :active.sync="bottomNav"
      :dark="darkTheme"
      :value="true"
      absolute
    >

      <v-btn
      @click="showMainSettings = !showMainSettings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>



      <v-btn
        v-if="!miniVariant"
        @click.stop="darkTheme = !darkTheme"
      >
        <span v-if="darkTheme">Light</span>
        <span v-else>Dark</span>
        <v-icon>invert_colors</v-icon>
      </v-btn>

      <v-btn
        v-if="!miniVariant"
        @click.stop="showFooter = !showFooter"
      >
        <span>Footer</span>
        <v-icon>visibility</v-icon>
      </v-btn>

    </v-bottom-nav>


    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">

      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>

      <p> version 2.0 </p>

    </v-toolbar>
    <v-content>
      <v-container>
        <v-slide-y-transition mode="out-in">
          <nuxt />
        </v-slide-y-transition>
      </v-container>
      <main-settings v-if="showMainSettings" :dialog="showMainSettings"></main-settings>
    </v-content>



  <v-footer
    v-if="showFooter"
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>Netherlands eScience Center</strong>

        <v-btn
          v-for="icon in footerIcons"
          :key="icon"
          class="mx-1"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>

      </v-card-actions>

    </v-card>


  </v-footer>



  </v-app>

</template>

<script>

  import MainSettings from '~/components/settings/MainSettings'
  import store from '~/store/index'

  export default {
    components: {
      'main-settings': MainSettings,
    },
    data() {
      return {
        title: this.pageName,
        darkTheme: false,
        miniVariant: false,
        clipped: false,
        drawer: true,
        fixed: false,
        showFooter: true,
        bottomNav: 2,
        showMainSettings: false,
        items: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'folder', title: 'Datasets', to: '/datasets' },
          { icon: 'dashboard', title: 'Dashboard', to: '/dashboard' },
          { icon: 'accessibility', title: 'Test', to: '' },
          { icon: 'account_circle', title: 'Account', to: '' },
          { icon: 'history', title: 'History', to: '' },
          { icon: 'share', title: 'Share', to: '' }
        ],
        footerIcons: [
        'fab fa-linkedin',
        'fab fa-twitter',
        'fab fa-flickr',
        'fab fa-youtube'
        ]
      }
    },
    computed: {
      pageName() {
        return this.$nuxt.$route.name
      },
      numberOfTotalDatasets (){
          return this.$store.getters.numberOfDatasets
      }
    }
  }
</script>


<style scoped>
.nlesc-logo {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.15s ease-in-out 0s;
  -ms-transition: all 0.15s ease-in-out 0s;
  -moz-transition: all 0.15s ease-in-out 0s;
  -webkit-transition: all 0.15s ease-in-out 0s;
}
.nlesc-logo:hover {
  -webkit-filter: grayscale(0%);
  -moz-filter: grayscale(0%);
  filter: grayscale(0%);
  opacity: 1;
  transition: all 0.15s ease-in-out 0s;
  -ms-transition: all 0.15s ease-in-out 0s;
  -moz-transition: all 0.15s ease-in-out 0s;
  -webkit-transition: all 0.15s ease-in-out 0s;
}

.fa-cog {
  width: 250px !important;
  height: 250px !important;
  color: aquamarine;
}
</style>
