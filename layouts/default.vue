<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      app
    >
      <vlist :items="items" @set-minivariant="setMinivariant" />
    </v-navigation-drawer>
    <vapp-bar :title="title" @toggle-drawer="drawer = !drawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; Savano - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-food',
          title: 'Menu',
          to: '/menu',
        },
      ],
      miniVariant: true,
      title: '',
    }
  },
  methods: {
    setMinivariant(value) {
      this.miniVariant = value
    },
  },
}
</script>
