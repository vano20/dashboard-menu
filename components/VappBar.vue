<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn icon @click.stop="logOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    logOut() {
      const loggedIn = this.$cookiz.get('logged-in')
      if (loggedIn) this.$cookiz.remove('logged-in')
      this.$router.push('/login')
    },
  },
}
</script>
