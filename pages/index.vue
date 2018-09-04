<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">

      </div>
      <v-card round>
        <v-card-title class="headline">Welcome to SPOT</v-card-title>
        <v-card-text>
          <p>SPOT is a...</p>
          <p>For more information on SPOT, check out the <a href="https://github.com/nlesc/spot" target="_blank">the code</a>.</p>
          <div class="text-xs-right">
            <em><small>&mdash; NLeSC SPOT Team</small></em>
          </div>
          <hr class="my-3">
          <a href="https://www.esciencecenter.nl/" target="_blank">NLeSC website</a>
          <br>
          <a href="https://github.com/nlesc" target="_blank">NLeSC on GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/dashboard">Dashboard</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  }
}
</script>
