<template>
  <v-row justify="start" align="center">
    <v-col cols="4" sm="2" md="2">
      <v-card>
        <v-card-title class="headline"> Total Menu </v-card-title>
        <v-card-text>
          <h1 class="text-center">{{ totalMenus }}</h1>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/menu"> View Menu </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: 'authenticated',
  async created() {
    await this.fetchMenus()
  },
  computed: {
    ...mapGetters({
      totalMenus: 'menu/totalMenus',
    }),
  },
  methods: {
    ...mapActions({
      fetchMenus: 'menu/fetchMenus',
    }),
  },
}
</script>
